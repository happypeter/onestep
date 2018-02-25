const Course = require('../models/course')
const fs = require('fs')
const config = require('../config/config')
const helper = require('./helper')
const jwt = require('jsonwebtoken')

function checkIfPaid(userId, course) {
  return helper.currentUser(userId).then(details => {
    let isPaid = false
    if (details.paidCourses.length) {
      isPaid = !!details.paidCourses.find(c => c.link.slice(1) === course)
    }
    return Promise.resolve(details.isMember || isPaid)
  })
}

function checkAuth(token) {
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return Promise.reject('认证码失效，请重新登录')
      } else {
        return Promise.reject('认证失败')
      }
    } else {
      return Promise.resolve(decoded._id)
    }
  })
}

exports.getEpisode = (req, res) => {
  const { courseName, episodeName } = req.query
  Course.findOne({ courseName: courseName })
    .then(course => {
      if (!course) return
      const { vlink, name, content: courseCatalogue } = course
      const path = `${config.docPath}/${courseName}/doc/${episodeName}.md`
      let title = ''
      for (let i = 0; i < courseCatalogue.length; i++) {
        let item = courseCatalogue[i]
        const ep = item.section.find(el => el.link === episodeName)
        if (ep) {
          title = ep.title
          break
        }
      }

      // 若是付费课程，则检查用户是否购买了课程
      if (course.price > 0) {
        const token = req.headers['authorization']
        if (token) {
          checkAuth(token)
            .then(userId => {
              return checkIfPaid(userId, courseName)
            })
            .then(result => {
              if (result) {
                const doc = fs.readFileSync(path, 'utf8')
                return res.status(200).json({
                  episode: { doc, vlink, name, title, courseCatalogue },
                  success: true
                })
              }
            })
            .catch(error => {
              return res.status(401).json({
                errorMsg: error,
                success: false
              })
            })
        }
      } else {
        // 免费课程
        const doc = fs.readFileSync(path, 'utf8')
        return res.status(200).json({
          episode: { doc, vlink, name, title, courseCatalogue },
          success: true
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}
