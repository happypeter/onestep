const fs = require('fs')
const path = require('path')
const User = require('../models/user')
const config = require('../config/config')

exports.getEpisode = async (req, res) => {
  const { link } = req.query
  try {
    const user = await User.findById({ _id: req.userId })
    if (user && user.coin && user.coin > 0) {
      const dirPath = path.join(process.env.HOME, config.docPath)
      const doc = fs.readFileSync(`${dirPath}/${link}.md`, 'utf8')
      res.json({ success: true, doc })
    } else {
      res.status(401).json({ success: false, errMsg: '购买后，才能阅读' })
    }
  } catch (err) {
    console.log('get doc err...', err)
  }
}
