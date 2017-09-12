const express = require('express')
const hello = require('./api/hello')

const router = express.Router()

// 测试
router.get('/', hello.world)

module.exports = router
