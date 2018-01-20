const Course = require('../models/course')

exports.single = (req, res) => {
  const {courseName} = req.params
  console.log(courseName)
  Course.findOne({courseName: courseName})
    .then(course => {
      console.log('course', course)
      if (!course) return
      res.status(200).json({success: true, course})
    })
    .catch(err => {
      console.log(err)
    })
}
