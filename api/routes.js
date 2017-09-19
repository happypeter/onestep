const express = require('express')
const hello = require('./api/hello')
const bucket = require('./api/bucket')
const sliceUploadFile = require('./api/sliceUploadFile')

const router = express.Router()

// 测试
router.get('/', hello.world)

// getBucket
router.get('/bucket', bucket.getBucket)
// getObject
router.post('/getObject', bucket.getObject)

router.post('/sliceUploadFile', sliceUploadFile.sliceUploadFile)

module.exports = router
