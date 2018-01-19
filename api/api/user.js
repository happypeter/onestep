const User = require('../models/user')
const Catalogue = require('../models/catalogue')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const msg = require('./msg')
const axios = require('axios')

const generateToken = function(user) {
  return jwt.sign(user, config.jwtSecret, {expiresIn: config.expiresIn})
}

exports.smsCodeForSignup = (req, res) => {
  const {phoneNum} = req.body

  User.findOne({phoneNum: phoneNum}).then(doc => {
    if (doc) {
      console.log('phoneNum already exists')
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

exports.login = (req, res, next) => {
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
    .catch(next)
}

exports.checkToken = function(req, res) {
  const token = req.body.token
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            errorMsg: 'EXPIRED_TOKEN',
            success: false,
          })
        } else {
          return res.status(401).json({
            errorMsg: 'INVALID_TOKEN',
            success: false,
          })
        }
      } else {
        if (decoded.phoneNum) {
          req.phoneNum = decoded.phoneNum
          return res.status(200).json({
            message: 'VALID_TOKEN',
            success: true,
          })
        } else {
          return res.status(401).json({
            errorMsg: 'INVALID_TOKEN',
            success: false,
          })
        }
      }
    })
  } else {
    return res.status(403).json({
      errorMsg: 'TOKEN_NOT_FOUND',
      success: false,
    })
  }
}

const chooseExpireDate = function(allExpireDateArr) {
  let parsedDate = []
  allExpireDateArr.forEach(date => {
    parsedDate = [...parsedDate, Date.parse(date)]
  })
  const maxParsedDate = Math.max(...parsedDate)
  let d = new Date()
  d.setTime(maxParsedDate)
  let latestExpireDate = JSON.stringify(d).substr(1, 10)

  return latestExpireDate
}

// Profile Page API
// 用于展示 profile 页的课程卡片
function getPaidCourse(course) {
  return Catalogue.findOne({link: `/${course}`})
    .then(item => {
      return item
    })
    .catch(err => {
      console.log(err)
    })
}

// 遍历获取每个...
async function getEveryPaidCourses(courses) {
  if (Object.prototype.toString.call(courses) !== '[object Array]') {
    throw new Error('courses must be an array')
  }

  let paidCourses = []
  for (let course of courses) {
    let a = await getPaidCourse(course)

    paidCourses.push(a)
  }

  return paidCourses
}

// API
exports.profile = (req, res) => {
  let courses = []
  let total = 0
  let allExpireDateArr = []
  let paidCourses = []

  User.findOne({_id: req.userId})
    .populate('contracts')
    .then(async user => {
      if (!user) {
        return res.status(422).json({
          errorMsg: '该用户不存在',
          success: false,
        })
      }
      const {admin} = user

      const contracts = user.contracts
      // 区别处理每个订单
      for (let contract of contracts) {
        // all paid courses
        courses = [...courses, ...contract.courseId]
        // 获取已购买课程的信息
        paidCourses = await getEveryPaidCourses(courses)

        // total
        total += contract.total

        // collect all kinds of membership expireDate
        if (contract.type === 'vip' || contract.type === 'member') {
          allExpireDateArr = [...allExpireDateArr, contract.expireDate]
        }
      }

      let latestExpireDate =
        allExpireDateArr.length !== 0
          ? chooseExpireDate(allExpireDateArr)
          : null

      return res.json({
        paidCourses,
        total,
        latestExpireDate,
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// reset password
exports.resetPassword = (req, res, next) => {
  const {username, password, phoneNum, smsCode} = req.body
  // msg
  //   .check(phoneNum, smsCode)
  //   .then(msg => {
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
    // })
    // .catch(error => {
    //   return res.status(403).json({
    //     errorMsg: error,
    //     success: false,
    //   })
    // })
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
