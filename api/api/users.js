const User = require('../models/user')
const jwt = require('jsonwebtoken')

const config = require('../config/config')
const msg = require('./msg')

const generateToken = data => {
  return jwt.sign(data, config.jwtSecret)
}

exports.sendSmsCode = async (req, res) => {
  const { phoneNum } = req.body
  try {
    const user = await User.findOne({ phoneNum })
    if (user) {
      return res.status(400).json({
        errorMsg: '手机号已被使用',
        success: false
      })
    }
    msg.send(req, res)
  } catch (err) {
    console.log('check signup sms code...', err)
  }
}

exports.signup = async (req, res) => {
  const { userName, password, phoneNum, smsCode } = req.body
  try {
    const userByNum = await User.findOne({ phoneNum })
    if (userByNum) {
      return res.status(400).json({
        errorMsg: '该手机号已被使用',
        success: false
      })
    }
    try {
      await msg.check(phoneNum, smsCode)
    } catch (err) {
      return res.status(400).json({
        errorMsg: err,
        success: false
      })
    }
    let count = await User.count()
    count += 1
    let flag = true
    while (flag) {
      const str = count.toString()
      let uid = str.length < 6 ? '000000'.slice(0, 6 - str.length) + str : str
      const user = new User({ userName, phoneNum, password, uid })
      try {
        const doc = await user.save()
        return res.json({
          token: generateToken({
            _id: doc._id,
            userName,
            phoneNum,
            uid
          }),
          success: true
        })
      } catch (err) {
        flag = err.code && err.code === 11000
        if (flag) {
          count += 1
        }
        console.log('save user err...', err.message)
      }
    }
  } catch (err) {
    console.log('sign up err...', err)
    return res.status(200).json({
      errorMsg: '注册失败，请稍后再试',
      success: false
    })
  }
}

exports.login = async (req, res) => {
  const { password, account } = req.body
  try {
    const user = await User.findOne({
      phoneNum: account
    })

    if (!user) {
      return res.status(400).json({
        errorMsg: '账号不存在',
        success: false
      })
    }
    const isMatch = user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({
        errorMsg: '账号密码不匹配',
        success: false
      })
    }

    const data = {
      userName: user.userName,
      coin: user.coin,
      _id: user._id,
      uid: user.uid,
      phoneNum: user.phoneNum,
      paidCourses: user.paidCourses
    }

    if (user.paidCourses.length) {
      data.paidCourses = user.paidCourses
    }

    if (user.admin) {
      data.admin = user.admin
    }

    if (user.vip) {
      data.vip = user.vip
    }

    return res.json({
      token: generateToken(data),
      success: true
    })
  } catch (err) {
    console.log('login err...', err)
    return res.status(200).json({
      errorMsg: '登录失败，请稍后再试',
      success: false
    })
  }
}

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(
      { _id: req.userId },
      '-_id coin paidCourses vip'
    )
    res.json({ success: true, user })
  } catch (err) {
    console.log('get profile err...', err)
  }
}

exports.vip = async (req, res) => {
  try {
    // The update() will not trigger the pre save() hook
    await User.update({ phoneNum: req.body.phoneNum }, { $set: { vip: true } })
    res.json({ success: true })
  } catch (err) {
    console.log('open vip err...', err)
  }
}
