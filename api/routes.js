const express = require('express')
const user = require('./api/user')
const msg = require('./api/msg')
const catalogue = require('./api/catalogue')
const course = require('./api/course')
const doc = require('./api/doc')

const router = express.Router()

// 用户接口
router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/auth', user.checkToken)
router.post('/resetpassword', user.resetPassword)

router.post('/profile', user.profile)

// sms verification
router.post('/msg', msg.send)
router.post('/signupcode', user.smsCodeForSignup)

// 课程展示接口
router.get('/catalogue', catalogue.catalogue)
router.post('/course', course.getCourse)
router.post('/episode', doc.getEpisode)

module.exports = router
