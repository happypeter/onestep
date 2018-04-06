const User = require('../models/user')
const Catalogue = require('../models/catalogue')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const msg = require('./msg')
const axios = require('axios')
const helper = require('./helper')

const generateToken = function(user) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: config.expiresIn })
}

exports.smsCodeForSignup = (req, res) => {
  const { phoneNum } = req.body
  User.findOne({ phoneNum: phoneNum }).then(doc => {
    if (doc) {
      return res.status(403).json({
        errorMsg: 'PHONE_NUM_ALREADY_EXISTS',
        success: false
      })
    } else {
      msg.send(req, res)
    }
  })
}

const weChatTokenApi = data => {
  const { code, userAgent } = data
  const {
    weChatAppId,
    weChatAppSecret,
    serviceAppId,
    serviceAppSecret
  } = config
  let params = { code, grant_type: 'authorization_code' }
  params.appid = userAgent === 'PC' ? weChatAppId : serviceAppId
  params.secret = userAgent === 'PC' ? weChatAppSecret : serviceAppSecret
  const queryStr = Object.keys(params)
    .map(key => {
      return `${key}=${params[key]}`
    })
    .join('&')

  return `https://api.weixin.qq.com/sns/oauth2/access_token?${queryStr}`
}

const weChatUserInfoApi = data => {
  const { access_token, openid } = data
  const url = 'https://api.weixin.qq.com/sns/userinfo'
  return `${url}?access_token=${access_token}&openid=${openid}&lang=zh_CN`
}

exports.weChat = function(req, res, next) {
  if (!req.body) return
  if (req.body && !req.body.code) return
  axios
    .get(weChatTokenApi(req.body))
    .then(res0 => {
      if (res0.data.errcode) return
      return axios.get(weChatUserInfoApi(res0.data)).then(res1 => {
        if (res1.data.errcode) return
        return User.findOne({ 'bindings.unionId': res1.data.unionid })
          .exec()
          .then(user => {
            //已经绑定
            if (user) {
              const data = {
                phoneNum: user.phoneNum,
                username: user.username,
                _id: user._id,
                bindings: user.bindings
              }
              if (user.admin) {
                data.admin = user.admin
              }
              res.status(200).json({
                token: generateToken(data),
                binding: true
              })
            } else {
              res.status(200).json({ user: res1.data, binding: false })
            }
          })
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// 绑定新账号
const bindingNewAccount = (req, res) => {
  const { username, phoneNum, password, smsCode } = req.body
  User.findOne({ username })
    .exec()
    .then(user => {
      if (user) {
        return res.status(403).json({
          errorMsg: '该用户名已被使用',
          success: false
        })
      }
      return User.findOne({ phoneNum }).exec()
    })
    .then(user => {
      if (user) {
        return res.status(403).json({
          errorMsg: '该手机号已被使用',
          success: false
        })
      }
      return msg.check(phoneNum, smsCode)
    })
    .then(code => {
      const { nickname, headimgurl, unionid } = req.body.user
      const user = new User()
      user.username = username
      user.phoneNum = phoneNum
      user.password = password
      user.bindings.push({
        via: 'wechat',
        nickName: nickname,
        headImgUrl: headimgurl,
        unionId: unionid
      })
      return user.save()
    })
    .then(user => {
      const data = {
        phoneNum: user.phoneNum,
        username: user.username,
        _id: user._id,
        bindings: user.bindings
      }
      return res.status(200).json({
        token: generateToken(data),
        success: true
      })
    })
    .catch(error => {
      console.log('wechat binding error:', error)
    })
}

const bindingExistedAccount = (req, res) => {
  const { nickname, headimgurl, unionid } = req.body.user
  const { account, password } = req.body
  User.findOne({ $or: [{ phoneNum: account }, { username: account }] })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(403).json({
          success: false,
          errorMsg: '账号不存在'
        })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return console.log(err)
        }
        if (!isMatch) {
          return res
            .status(403)
            .json({ success: false, errorMsg: '账号密码不匹配' })
        }
        user.bindings.push({
          via: 'wechat',
          nickName: nickname,
          headImgUrl: headimgurl,
          unionId: unionid
        })
        return user.save().then(user => {
          const data = {
            phoneNum: user.phoneNum,
            username: user.username,
            _id: user._id,
            bindings: user.bindings
          }
          if (user.admin) {
            data.admin = user.admin
          }
          res.status(200).json({ token: generateToken(data) })
        })
      })
    })
    .catch(err => {
      console.log('wechat binding error:', err)
    })
}

exports.binding = (req, res) => {
  if (req.body.existed) {
    bindingExistedAccount(req, res)
  } else {
    bindingNewAccount(req, res)
  }
}

exports.signup = (req, res, next) => {
  const { username, password, phoneNum, smsCode } = req.body
  User.findOne({ username })
    .exec()
    .then(user => {
      if (user) {
        return res.status(403).json({
          errorMsg: '该用户名已被使用',
          success: false
        })
      }
      return User.findOne({ phoneNum }).exec()
    })
    .then(user => {
      if (user) {
        return res.status(403).json({
          errorMsg: '该手机号已被使用',
          success: false
        })
      }
      return msg.check(phoneNum, smsCode)
    })
    .then(code => {
      const user = new User()
      user.username = username
      user.phoneNum = phoneNum
      user.password = password
      return user.save().then(user => {
        const data = {
          phoneNum: user.phoneNum,
          username: user.username,
          _id: user._id,
          bindings: user.bindings
        }
        return res.status(200).json({
          token: generateToken(data),
          success: true
        })
      })
    })
    .catch(error => {
      console.log(error)
    })
}

exports.login = (req, res) => {
  const { password, account } = req.body
  User.findOne({ $or: [{ phoneNum: account }, { username: account }] })
    .then(user => {
      if (!user) {
        return res.status(403).json({
          errorMsg: '账号不存在',
          success: false
        })
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (err) {
            return console.log(err)
          }
          if (!isMatch) {
            return res.status(403).json({
              errorMsg: '账号密码不匹配',
              success: false
            })
          }
          const data = {
            phoneNum: user.phoneNum,
            username: user.username,
            _id: user._id,
            bindings: user.bindings
          }
          if (user.admin) {
            data.admin = user.admin
          }
          return res.json({
            token: generateToken(data),
            success: true
          })
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
}

// API
exports.profile = (req, res) => {
  helper
    .currentUser(req.userId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
    })
}

// reset password
exports.resetPassword = (req, res, next) => {
  const { username, password, phoneNum, smsCode } = req.body
  msg
    .check(phoneNum, smsCode)
    .then(msg => {
      User.findOne({ username, phoneNum })
        .then(user => {
          if (user) {
            user.password = password
            return user.save().then(user => {
              return res.status(200).json({
                success: true
              })
            })
          } else {
            return User.findOne({
              username,
              phoneNum: { $exists: false }
            }).then(user => {
              if (user) {
                user.password = password
                user.phoneNum = phoneNum
                return user.save().then(user => {
                  return res.status(200).json({
                    success: true
                  })
                })
              } else {
                return res.status(403).json({
                  errorMsg: '账号不存在',
                  success: false
                })
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      return res.status(403).json({
        errorMsg: error,
        success: false
      })
    })
}

exports.password = (req, res, next) => {
  const { oldOne, newOne } = req.body
  User.findOne({ _id: req.userId })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(422).json({
          errorMsg: '该用户不存在',
          success: false
        })
      } else {
        user.comparePassword(oldOne, function(err, isMatch) {
          if (err) {
            return console.log(err)
          }
          if (!isMatch) {
            return res.status(403).json({
              errorMsg: '原密码错误',
              success: false
            })
          }
          user.password = newOne
          return user.save().then(user => {
            return res.json({
              success: true
            })
          })
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
}
