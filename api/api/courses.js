const fs = require('fs')
const path = require('path')
const config = require('../config/config')
const User = require('../models/user')

function getCourseToc(course) {
  const dirPath = path.join(process.env.HOME, config.docPath)
  const content = fs.readFileSync(`${dirPath}/SUMMARY.md`, 'utf8')
  const lines = content.split('\n')
  let toc = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const reg = /^\*\s+\[(.*)\]\((.*)\)$/
    if (reg.test(line)) {
      const title = line.replace(reg, '$1')
      const link = line.replace(reg, '$2').slice(0, -3)
      toc.push({ title, link })
    }
  }
  return toc
}

exports.single = (req, res) => {
  const course = getCourseToc(config.docPath)
  res.json({ success: true, course })
}

exports.open = async (req, res) => {
  const { uid, coin } = req.body
  try {
    await User.update({ uid }, { $set: { coin } })
    res.json({ success: true })
  } catch (err) {
    console.log('open access right err...', err)
    res.status(400).json({ success: false })
  }
}
