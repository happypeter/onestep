const Episode = require('../models/episode')

exports.getEpisode = async (req, res) => {
  const { courseUid, episodeUid } = req.query
  const ep = await Episode.findOne({ uid: episodeUid, courseUid })
  res.json(ep)
}
