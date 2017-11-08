const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

let generateToken = function (user) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: config.expiresIn })
}

exports.signup = (req, res, next) => {
  const {username, password, mailbox: mails} = req.body
  Promise.all([
    User.findOne({username: username}),
    User.find({ 'mails.address': mails })
  ])
  .then(doc => {
    if (doc[0]) {
      console.log('username already exists')
      return res.status(403).json({
        errorMsg: 'USERMANE_ALREADY_EXISTS',
        success: false
      })
    }
    if (doc[1].length !== 0) {
      console.log('mailbox already exists')
      return res.status(403).json({
        errorMsg: 'MAILBOX_ALREADY_EXISTS',
        success: false
      })
    }

    const user = new User()
    user.username = username
    user.password = password
    user.mails.push({
      address: mails,
      verified: false
    })

    user.save().then(
      user => {
        return res.status(200).json({
          user: {username: user.username},
          token: generateToken({username: user.username}),
          success: true
        })
      }
    )
  })
  .catch(next)
}

exports.login = (req, res, next) => {
  const {username, password} = req.body

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
              return res.json({
                user: {username: user.username},
                token: generateToken({username: user.username}),
                success: true
              })
            })
          }
        }
      )
}

exports.checkToken = function (req, res) {
  let token = req.body.token
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ errorMsg: '认证码失效，请重新登录!' })
        } else {
          return res.status(401).json({ errorMsg: '认证失败！' })
        }
      } else {
        if (decoded.username) {
          req.username = decoded.username
          return res.status(200).json({
            message: '登录中',
            success: true
          })
        } else {
          res.status(401).json({ errorMsg: '认证失败！' })
        }
      }
    })
  } else {
    return res.status(403).json({
      errorMsg: '请提供认证码！'
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
  const {username} = req.body
  let courses = []
  let total = 0
  let allExpireDateArr = []
  User.findOne({username: username})
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
