const express = require('express')
const users = require('./api/users')
const courses = require('./api/courses')
const episodes = require('./api/episodes')
const auth = require('./middlewares/auth')

const router = express.Router()

// 用户认证接口
router.post('/signup', users.signup)
router.post('/login', users.login)
router.get('/profile', auth.user, users.profile)

// sms verification
router.post('/smscode', users.sendSmsCode)

// 课程展示接口
router.get('/course', courses.single)
router.post('/vip', auth.admin, users.vip)
router.post('/buy', auth.admin, courses.buy)
router.get('/episode', auth.user, episodes.getEpisode)

module.exports = router
