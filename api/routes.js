const express = require('express')
const hello = require('./api/hello')
const user = require('./api/user')

const router = express.Router()

// 测试
router.get('/', hello.sayHello)

// 用户接口
router.post('/signup', user.signup)
router.post('/login', user.login)

module.exports = router
