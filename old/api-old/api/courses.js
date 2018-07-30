const Course = require('../models/course')

exports.single = async (req, res) => {
  const { courseName } = req.params
  const uid = courseName
  try {
    const course = await Course.findOne({ uid })
    console.log('course', course)
    if (!course) throw Error('没有此课程')
    res.status(200).json({ success: true, course })
  } catch (err) {
    console.log(err)
    res.status(403).json({
      errorMsg: err.message,
      success: false,
    })
  }
}
