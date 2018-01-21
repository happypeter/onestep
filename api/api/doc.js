const Course = require('../models/course')
const fs = require('fs')
const config = require('../config/config')

function getEpisodeDoc(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if(err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

exports.getEpisode = (req, res) => {
  const {courseName, episodeName} = req.query
  Course.findOne({courseName: courseName})
    .then(course => {
      if (!course) return
      const {vlink, name, content: courseCatalogue} = course
      const path = `${config.docPath}/${courseName}/doc/${episodeName}.md`
      return getEpisodeDoc(path).then(doc => {
        return res.status(200).json({
          episode: {
            doc,
            vlink,
            name,
            courseCatalogue
         },
         success: true
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
}
