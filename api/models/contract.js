const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContractSchema = new Schema(
  {
    username: String,
    paidCourses: Array,
    member: Boolean,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contract', ContractSchema)
