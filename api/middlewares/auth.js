const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user')

exports.user = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .json({ errorMsg: '认证码失效，请重新登录', success: false })
        }
        return res.status(401).json({ errorMsg: '认证失败', success: false })
      }
      req.userId = decoded._id
      next()
    })
  } else {
    return res.status(403).json({
      errorMsg: '请提供认证码',
      success: false
    })
  }
}

exports.admin = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .json({ errorMsg: '认证码失效，请重新登录', success: false })
        }
        return res.status(401).json({ errorMsg: '认证失败', success: false })
      }
      const user = await User.findById({ _id: decoded._id })
      if (!user.admin) {
        return res.status(401).json({ errorMsg: '认证失败', success: false })
      }
      next()
    })
  } else {
    return res.status(403).json({
      errorMsg: '请提供认证码',
      success: false
    })
  }
}
