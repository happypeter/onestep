const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContractSchema = new Schema(
  {
    outTradeNo: String, // 订单号
    status: String,
    startDate: Date,
    expireDate: Date,
    total: Number,
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contract', ContractSchema)
