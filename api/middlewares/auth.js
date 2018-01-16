const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user')

exports.user = (req, res, next) => {
  const token = req.headers['authorization']
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({error: '认证码失效，请重新登录'})
        } else {
          return res.status(401).json({error: '认证失败'})
        }
      } else {
        req.userId = decoded._id
        next()
      }
    })
  } else {
    res.status(403).json({
      error: '请提供认证码',
    })
  }
}
