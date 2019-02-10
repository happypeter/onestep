const User = require('../models/user')

exports.open = async (req, res) => {
  const { phoneNum, course } = req.body
  try {
    const user = await User.findOne({ phoneNum })
    user.paidCourses = [...new Set([...user.paidCourses, course])]
    await user.save()
    res.json({ success: true })
  } catch (err) {
    console.log('buy course err...', err)
  }
}
