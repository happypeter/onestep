const Doc = require('../models/doc')
const Course = require('../models/course')

exports.getEpisode = (req, res) => {
  const {courseName, episodeName} = req.query
  Promise.all([
    Doc.findOne({title: courseName}),
    Course.findOne({courseName: courseName}),
  ])
    .then(item => {
      if (!item[0]) {
        res.status(404).send('404: no such a course in markdown doc')
      }
      if (!item[1]) {
        res.status(404).send('404: no such a course')
      }

      let {vlink} = item[1]
      let {name} = item[1]
      let courseCatalogue = item[1].content

      let targetEpisode
      courseCatalogue.find(chapter => {
        if (!chapter) throw new Error('no such a chapter')

        targetEpisode = chapter.toJSON().section.find(episode => {
          if (!episode) throw new Error('no such a episode')
          return episode.link === episodeName
        })
        return targetEpisode
      })

      let title = targetEpisode && targetEpisode.title

      let docJSON = item[0].toJSON()
      for (let key of Object.keys(docJSON)) {
        if (key === `${episodeName}.md`) {
          let doc = docJSON[key]
          return res.status(200).json({
            episode: {
              doc,
              vlink,
              title,
              name,
              courseCatalogue
           },
           success: true
         })
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
}
