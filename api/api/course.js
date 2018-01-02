const Course = require('../models/course')

exports.getCourse = (req, res) => {
  const {courseName} = req.body

  Course.findOne({courseName: courseName})
    .then(item => {
      if (!item) {
        res.status(404).send('404: no such a course')
      }
      res.send(item)
    })
    .catch(err => {
      console.log(err)
    })
}
