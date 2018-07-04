const Episode = require('../models/episode')

exports.getEpisode = async (req, res) => {
  const { courseName, episodeUid } = req.query
  console.log(req.query)
  const ep = await Episode.findOne({ uid: episodeUid, courseUid: courseName })
  res.json(ep)
}
