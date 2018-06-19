const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean },
    phoneNum: { type: String, unique: true },
    bindings: [
      {
        _id: false,
        via: String,
        nickName: String,
        headImgUrl: String,
        unionId: String,
      },
    ],
  },
  { timestamps: true }
)

UserSchema.pre('save', next => {
  const user = this
  const SALT_FACTOR = 5
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = (password, cb) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
