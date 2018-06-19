const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CatalogueSchema = new Schema(
  {
    key: { type: Number },
    cover: { type: String },
    title: { type: String },
    total: { type: String },
    link: { type: String },
    publishedOn: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Catalogue', CatalogueSchema)
