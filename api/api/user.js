const User = require('../models/user')
const Catalogue = require('../models/catalogue')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const msg = require('./msg')
const axios = require('axios')
const helper = require('./helper')

const generateToken = function(user) {
  return jwt.sign(user, config.jwtSecret, {expiresIn: config.expiresIn})
}

exports.smsCodeForSignup = (req, res) => {
  const {phoneNum} = req.body
  User.findOne({phoneNum: phoneNum}).then(doc => {
    if (doc) {
      return res.status(403).json({
        errorMsg: 'PHONE_NUM_ALREADY_EXISTS',
        success: false,
      })
    } else {
      msg.send(req, res)
    }
  })
}

exports.weChat = function(req, res, next) {
  const {code, userAgent} = req.body
  let wxToken
  if (userAgent === 'PC') {
    wxToken = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${
      config.weChatAppId
    }&secret=${
      config.weChatAppSecret
    }&code=${code}&grant_type=authorization_code`
  } else {
    wxToken = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${
      config.serviceAppID
    }&secret=${
      config.serviceAppSecret
    }&code=${code}&grant_type=authorization_code`
  }

  axios.get(wxToken).then(req => {
    if (req.data.errcode) return
    const {access_token, openid} = req.data
    const wxUserInfo = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`

    axios.get(wxUserInfo).then(req => {
      if (req.data.errcode) return
      User.findOne({'bindings.unionid': req.data.unionid})
        .exec()
        .then(user => {
          //已经绑定
          if (user) {
            const data = {
              phoneNum: user.phoneNum,
              username: user.username,
              _id: user._id,
              bindings: user.bindings,
            }
            res.status(200).json({
              token: generateToken(data),
              binding: true,
            })
          } else {
            res.status(200).json({user: req.data, binding: false})
          }
        })
    })
  })
}

exports.binding = (req, res, next) => {
  const {nickname, headimgurl, unionid} = req.body.user
  if (req.body.existed) {
    const {account, password} = req.body
    User.findOne({$or: [{phoneNum: account}, {username: account}]})
      .exec()
      .then(user => {
        if (!user) {
          return res.status(403)
          .json({
            success: false,
            errorMsg: '账号不存在'
          })
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return console.log(err)
          }
          if (!isMatch) {
            return res.status(403).json({success: false, errorMsg: '账号密码不匹配'})
          }
          user.bindings.push({via: 'wechat', nickname, headimgurl, unionid})
          return user.save().then(user => {
            const data = {
              phoneNum: user.phoneNum,
              username: user.username,
              _id: user._id,
              bindings: user.bindings,
            }
            res.status(200).json({
              token: generateToken(data),
            })
          })
        })
      })
      .catch(err => {
        console.log('wechat binding error:', err)
      })
  } else {
    // 绑定新账号
    const {username, phoneNum, password, smsCode} = req.body
    Promise.all([
      User.findOne({username}).exec(),
      User.findOne({phoneNum}).exec(),
    ])
      .then(results => {
        if (results[0]) {
          return res.status(403).json({
            errorMsg: '该用户名已被使用',
            success: false,
          })
        }
        if (results[1]) {
          return res.status(403).json({
            errorMsg: '该手机号已被使用',
            success: false,
          })
        }
        msg
          .check(phoneNum, smsCode)
          .then(code => {
            if (code === smsCode) {
              const user = new User()
              user.username = username
              user.phoneNum = phoneNum
              user.password = password
              return user.save().then(user => {
                const data = {
                  phoneNum: user.phoneNum,
                  username: user.username,
                  _id: user._id,
                  bindings: user.bindings,
                }
                return res.status(200).json({
                  token: generateToken(data),
                  success: true,
                })
              })
            }
          })
          .catch(error => {
            return res.status(403).json({
              errorMsg: error,
              success: false,
            })
          })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

exports.signup = (req, res, next) => {
  const {username, password, phoneNum, smsCode} = req.body
  Promise.all([
    User.findOne({username}).exec(),
    User.findOne({phoneNum}).exec(),
  ])
    .then(results => {
      if (results[0]) {
        return res.status(403).json({
          errorMsg: '该用户名已被使用',
          success: false,
        })
      }
      if (results[1]) {
        return res.status(403).json({
          errorMsg: '该手机号已被使用',
          success: false,
        })
      }
      msg
        .check(phoneNum, smsCode)
        .then(code => {
          if (code === smsCode) {
            const user = new User()
            user.username = username
            user.phoneNum = phoneNum
            user.password = password
            return user.save().then(user => {
              const data = {
                phoneNum: user.phoneNum,
                username: user.username,
                _id: user._id,
                bindings: user.bindings,
              }
              return res.status(200).json({
                token: generateToken(data),
                success: true,
              })
            })
          }
        })
        .catch(error => {
          return res.status(403).json({
            errorMsg: error,
            success: false,
          })
        })
    })
    .catch(error => {
      console.log(error)
    })
}

exports.login = (req, res) => {
  const {password, account} = req.body
  User.findOne({$or: [{phoneNum: account}, {username: account}]})
    .then(user => {
      if (!user) {
        return res.status(403).json({
          errorMsg: '账号不存在',
          success: false,
        })
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (err) {
            return console.log(err)
          }
          if (!isMatch) {
            return res.status(403).json({
              errorMsg: '账号密码不匹配',
              success: false,
            })
          }
          const data = {
            phoneNum: user.phoneNum,
            username: user.username,
            _id: user._id,
            bindings: user.bindings,
          }
          return res.json({
            token: generateToken(data),
            success: true,
          })
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
}

exports.checkToken = function(req, res) {
  const token = req.body.token
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            errorMsg: '认证码失效，请重新登录',
            success: false,
          })
        } else {
          return res.status(401).json({
            errorMsg: '认证失败',
            success: false,
          })
        }
      } else {
        return res.status(200).json({
          message: '认证成功',
          success: true,
        })
      }
    })
  }
}

// API
exports.profile = (req, res) => {
  helper.currentUser(req.userId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
    })
}

// reset password
exports.resetPassword = (req, res, next) => {
  const {username, password, phoneNum, smsCode} = req.body
  msg
    .check(phoneNum, smsCode)
    .then(msg => {
      User.findOne({username, phoneNum})
        .then(user => {
          if (user) {
            user.password = password
            return user.save().then(user => {
              return res.status(200).json({
                success: true,
              })
            })
          } else {
            return User.findOne({username, phoneNum: {$exists: false}}).then(
              user => {
                if (user) {
                  user.password = password
                  user.phoneNum = phoneNum
                  return user.save().then(user => {
                    return res.status(200).json({
                      success: true,
                    })
                  })
                } else {
                  return res.status(403).json({
                    errorMsg: '账号不存在',
                    success: false,
                  })
                }
              }
            )
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      return res.status(403).json({
        errorMsg: error,
        success: false,
      })
    })
}

exports.password = (req, res, next) => {
  const {oldOne, newOne} = req.body
  User.findOne({_id: req.userId})
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
              success: false,
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
