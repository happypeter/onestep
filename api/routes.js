const express = require('express')
const hello = require('./api/hello')
const user = require('./api/user')
const msg = require('./api/msg')

const router = express.Router()

// 测试
router.get('/', hello.sayHello)

// 用户接口
router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/auth', user.checkToken)

router.post('/profile', user.profile)

// sms verification
router.post('/msg', msg.send)

module.exports = router
