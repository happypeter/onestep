const fs = require('fs')
const path = require('path')

exports.single = async (req, res) => {
  const dirPath = path.join(process.env.HOME, 'coin-haoqi/data')
  try {
    const data = fs.readFileSync(`${dirPath}/index.json`)
    const course = JSON.parse(data)
    res.json({ success: true, course })
  } catch (err) {
    console.log('course info err...', err)
  }
}
