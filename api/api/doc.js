const Doc = require('../models/doc')

exports.getEpisode = async (req, res) => {
  const { courseName, episodeName } = req.query
  console.log(req.query)
  const doc = await Doc.find({ uid: episodeName, courseUid: courseName })
  res.json(doc)
}
