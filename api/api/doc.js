const Doc = require('../models/doc')
const Course = require('../models/course')

exports.getEpisode = (req, res) => {
  ({courseName, episodeName} = req.body)
  Promise.all([
    Doc.findOne({title: courseName}),
    Course.findOne({courseName: courseName}),
  ])
    .then(item => {
      if (!item[0]) {
        console.log(`doc数据里没有这一项${item[0]}`)
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
          return res.send({
            doc,
            vlink,
            title,
            name,
            courseCatalogue
          })
        }
      }
      res.status(404).send('~404~')
    })
    .catch(err => {
      console.log(err)
    })
}
