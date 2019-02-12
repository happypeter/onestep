const express = require('express')
const admin = require('./api/admin')
const router = express.Router()

router.post('/open', admin.open)
router.get('/users', admin.users)

module.exports = router
