const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContractSchema = new Schema(
  {
    type: { type: String },
    startDate: { type: String },
    expireDate: { type: String },
    total: { type: Number },
    courseId: [{ type: String }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Contract', ContractSchema)
