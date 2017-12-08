const Catalogue = require('../models/catalogue')

exports.catalogue = (req, res) => {
  Catalogue.find()
           .sort({key: -1})
           .then(
             item => { res.send(item) }
           )
           .catch(
             err => { console.log(err) }
           )
}
