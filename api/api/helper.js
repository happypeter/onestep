const Catalogue = require('../models/catalogue')
const Contract = require('../models/contract')
const moment = require('moment')

exports.currentUser = (userId) => {
  let sum = 0, isMember = false
  let paidCourses = []
  let memberships = []
  return Promise.all([
    Catalogue.find().exec(),
    Contract.find({userId: userId, status: '已支付'})
      .sort('createdAt')
      .populate('courseId', 'courseName')
      .exec()
  ])
    .then(results => {
      const courses = results[0]
      const contracts = results[1]

      for(let i = 0; i < contracts.length; i++) {
        let item = contracts[i]
        if (item.courseId) {
          const {courseName} = item.courseId
          const course = courses.find(c => c.link.slice(1) === courseName)
          paidCourses.push({...course._doc, total: item.total})
        } else {
          const {startDate, expireDate, total} = item
          const data = {}
          data.total = total
          const now = moment()
          if (now.isBefore(expireDate, 'day')) {
            data.isExpired = false
            data.days = Math.abs(now.diff(expireDate, 'days'))
            isMember = true
          } else {
            data.isExpired = true
          }
          data.startDate = moment(startDate).format('YYYY-MM-DD')
          data.expireDate = moment(expireDate).format('YYYY-MM-DD')
          data.duration = moment(expireDate).diff(startDate, 'months')
          memberships.push(data)
        }
        sum = sum + item.total
      }

      return Promise.resolve({
        paidCourses,
        sum,
        isMember,
        memberships
      })
    })
    .catch(error => {
      console.log(error)
    })
}
