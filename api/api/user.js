const User = require('../models/user')

exports.signup = (req, res, next) => {
  console.log(req.body)
  const {username, password, mailbox: mails} = req.body

  Promise.all([
    User.findOne({username: username}).exec(),
    User.find({ 'mails': { address: mails } })
  ])
  .then(doc => {
    if (doc[0]) {
      console.log('username already exists')
      return res.status(403).json({
        error: 'username already exists'
      })
    }
    if (doc[1].length !== 0) {
      console.log('mailbox already exists')
      return res.status(403).json({
        error: 'mailbox already exists'
      })
    }

    const user = new User()
    user.username = username
    user.password = password
    user.mails.push({
      address: mails,
      verified: false
    })

    user.save().then(
      user => {
        return res.status(200).json({
          success: true
        })
      }
    )
  })
  .catch(next)
}
