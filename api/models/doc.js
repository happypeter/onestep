const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DocSchema = new Schema(
  {
    courseUid: String,
    uid: String,
    markdown: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Doc', DocSchema)
