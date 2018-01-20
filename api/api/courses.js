const Course = require('../models/course')

exports.single = (req, res) => {
  const {courseName} = req.params
  Course.findOne({courseName: courseName})
    .then(course => {
      if (!course) return
      res.status(200).json({success: true, course})
    })
    .catch(err => {
      console.log(err)
    })
}
