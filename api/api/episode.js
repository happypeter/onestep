const Episode = require('../models/episode')

exports.getEpisode = async (req, res) => {
  const { courseName, episodeName } = req.query
  console.log(req.query)
  const ep = await Episode.findOne({ uid: episodeName, courseUid: courseName })
  res.json(ep)
}
