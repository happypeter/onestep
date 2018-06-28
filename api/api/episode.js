const Episode = require('../models/episode')

exports.getEpisode = async (req, res) => {
  const { courseName, episodeName } = req.query
  console.log(req.query)
  const ep = await Episode.find({ uid: episodeName, courseUid: courseName })
  res.json(ep)
}
