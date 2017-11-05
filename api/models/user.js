const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    admin: { type: String },
    wechatId: { type: String },
    mails: [{
      address: String,
      verified: Boolean
    }],
    contracts: [{type: Schema.Types.ObjectId, ref: 'Contract'}]
  },
  {timestamps: true}
)

UserSchema.pre('save', function (next) {
  const user = this
  const SALT_FACTOR = 5
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) { return cb(err) }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
