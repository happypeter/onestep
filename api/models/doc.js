const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DocSchema = new Schema(
  {
    title: { type: String },
    any: { type: String }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Doc', DocSchema)

// new Schema(
//   {
//     any: { type: String }
//   }??
