const express = require('express')
const hello = require('./api/hello')
const bucket = require('./api/bucket')
const auth = require('./api/auth')

const router = express.Router()

// 测试
router.get('/', hello.world)

// getBucket
router.get('/bucket', bucket.getBucket)
// getObject
router.post('/getObject', bucket.getObject)

// auth
router.get('/auth', auth.auth)

module.exports = router
