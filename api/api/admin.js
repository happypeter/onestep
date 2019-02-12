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

exports.users = async (req, res) => {
  try {
    const count = await User.find({}).count()
    res.json({ success: true, count })
  } catch (err) {
    console.log('get user count err...', err)
  }
}
