const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const msg = require('./msg')

let generateToken = function (user) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: config.expiresIn })
}

exports.signup = (req, res, next) => {
  const { password, phoneNum, smsCode } = req.body
  msg.check(phoneNum, smsCode)
     .then(
       msg => {
         console.log('smsCode: ' + msg)
         User.findOne({ 'phoneNum': phoneNum })
             .then(doc => {
               if (doc) {
                 console.log('phoneNum already exists')
                 return res.status(403).json({
                   errorMsg: 'PHONE_NUM_ALREADY_EXISTS',
                   success: false
                 })
               }

               const user = new User()
               user.phoneNum = phoneNum
               user.password = password

               user.save().then(
                 user => {
                   console.log(phoneNum + 'signup')
                   return res.status(200).json({
                     user: {phoneNum: user.phoneNum},
                     token: generateToken({phoneNum: user.phoneNum}),
                     success: true
                   })
                 }
               )
             })
             .catch(next)
       }
     )
     .catch(
       err => {
         console.log(err)
         return res.status(403).json({
           errorMsg: err,
           success: false
         })
       }
     )
}

exports.login = (req, res, next) => {
  const { username, password, phoneNum, smsCode } = req.body

  if (username) {
    // 老用户过渡
    msg.check(phoneNum, smsCode)
       .then(
         msg => {
           console.log('smsCode: ' + msg)
           User.findOne({username: username})
               .then(
                 user => {
                   if (!user) {
                     console.log("the user doesn't exist")
                     return res.status(403).json({
                       errorMsg: 'USER_DOESNOT_EXIST',
                       success: false
                     })
                   } else {
                     if (user.phoneNum) {
                       console.log('该用户已绑定手机号' + user.phoneNum)
                       return res.status(403).json({
                         errorMsg: 'PLEASE_USE_PHONE_NUM',
                         success: false
                       })
                     }
                     // update
                     user.phoneNum = phoneNum
                     user.password = password

                     user.save().then(
                       user => {
                         console.log(username + ' updated: ' + phoneNum)
                         return res.status(200).json({
                           user: {phoneNum: user.phoneNum},
                           token: generateToken({phoneNum: user.phoneNum}),
                           success: true
                         })
                       }
                     )
                     .catch(
                       err => {
                         console.log(err)
                       }
                     )
                   }
                 }
               )
               .catch(next)
         }
       )
       .catch(
         err => {
           console.log(err)
           return res.status(403).json({
             errorMsg: err,
             success: false
           })
         }
       )
  } else {
    // 手机号登录
    User.findOne({phoneNum: phoneNum})
        .then(
          user => {
            if (!user) {
              console.log("this phoneNum doesn't exist")
              return res.status(403).json({
                errorMsg: 'PHONE_NUM_DOESNOT_EXIST',
                success: false
              })
            } else {
              user.comparePassword(password, function (err, isMatch) {
                if (err) {
                  return console.log(err)
                }
                if (!isMatch) {
                  console.log('invalid password')
                  return res.status(403).json({
                    errorMsg: 'INVALID_PASSWORD',
                    success: false
                  })
                }
                console.log(phoneNum + 'login')
                return res.json({
                  user: {phoneNum: user.phoneNum},
                  token: generateToken({phoneNum: user.phoneNum}),
                  success: true
                })
              })
            }
          }
        )
        .catch(next)
  }
}

exports.checkToken = function (req, res) {
  let token = req.body.token
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            errorMsg: 'EXPIRED_TOKEN',
            success: false
          })
        } else {
          return res.status(401).json({
            errorMsg: 'INVALID_TOKEN',
            success: false
          })
        }
      } else {
        if (decoded.phoneNum) {
          req.phoneNum = decoded.phoneNum
          return res.status(200).json({
            message: 'VALID_TOKEN',
            success: true
          })
        } else {
          res.status(401).json({
            errorMsg: 'INVALID_TOKEN',
            success: false
          })
        }
      }
    })
  } else {
    return res.status(403).json({
      errorMsg: 'TOKEN_NOT_FOUND',
      success: false
    })
  }
}

const chooseExpireDate = function (allExpireDateArr) {
  let parsedDate = []
  allExpireDateArr.forEach(
    date => {
      parsedDate = [...parsedDate, Date.parse(date)]
    }
  )
  const maxParsedDate = Math.max(...parsedDate)
  let d = new Date()
  d.setTime(maxParsedDate)
  let latestExpireDate = JSON.stringify(d).substr(1, 10)

  return latestExpireDate
}

exports.profile = (req, res) => {
  // const {username} = req.body
  const {phoneNum} = req.body
  let courses = []
  let total = 0
  let allExpireDateArr = []
  User.findOne({phoneNum: phoneNum})
      .populate('contracts')
      .then(
        user => {
          if (!user) {
            res.status(403).json({
              errorMsg: 'USER_DOESNOT_EXIST',
              success: false
            })
            throw new Error('user is ' + user)
          }
          const contracts = user.contracts
          contracts.forEach(
            contract => {
              // all paid courses
              courses = [...courses, ...contract.courseId]
              // total
              total += contract.total
              // collect all kinds of membership expireDate
              if (contract.type === 'vip' || contract.type === 'member') {
                allExpireDateArr = [...allExpireDateArr, contract.expireDate]
              }
            }
          )
          let latestExpireDate = chooseExpireDate(allExpireDateArr)

          return res.json({
            courses,
            total,
            latestExpireDate
          })
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
}
