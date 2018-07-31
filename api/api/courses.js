const fs = require('fs')
const path = require('path')
const config = require('../config/config')

exports.single = async (req, res) => {
  const dirPath = path.join(process.env.HOME, config.docPath)

  try {
    const data = fs.readFileSync(`${dirPath}/index.json`)
    const course = JSON.parse(data)
    res.json({ success: true, course })
  } catch (err) {
    console.log('course info err...', err)
  }
}
