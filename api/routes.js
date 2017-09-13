const express = require('express')
const hello = require('./api/hello')
const bucket = require('./api/bucket')

const router = express.Router()

// 测试
router.get('/', hello.world)

router.get('/bucket', bucket.get)

module.exports = router
