const Catalogue = require('../models/catalogue')

exports.catalogue = (req, res) => {
  Catalogue.find()
    .sort({key: -1})
    .then(courses => {
      res.status(200).json({courses})
    })
    .catch(err => {
      console.log(err)
    })
}
