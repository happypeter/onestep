const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CatalogueSchema = new Schema(
  {
    cover: { type: String },
    title: { type: String },
    uid: { type: String }, // 精确的课程名英文，类似 antd , ride-cli-monster
    serialNo: { type: Number, unique: true }, // 发布顺序代号， e.g 1 ,2 ...
  },
  { timestamps: true }
)

module.exports = mongoose.model('Catalogue', CatalogueSchema)
