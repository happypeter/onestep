const SMSClient = require('@alicloud/sms-sdk')
const moment = require('moment')
const config = require('../config/config')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = config.accessKeyId
const secretAccessKey = config.secretAccessKey

// 在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
// const queueName = config.queueName

// 初始化sms_client
const smsClient = new SMSClient({ accessKeyId, secretAccessKey })

// 发送短信
exports.send = async (req, res) => {
  const phoneNum = req.body.phoneNum
  // 六位随机验证码
  const smsCode = Math.random()
    .toString()
    .slice(-6)
  try {
    const smsRes = await smsClient.sendSMS({
      PhoneNumbers: phoneNum,
      SignName: config.SignName,
      TemplateCode: config.TemplateCode,
      TemplateParam: `{"code": "${smsCode}"}`
    })
    const { Code } = smsRes
    if (Code === 'OK') {
      return res.status(200).json({
        message: '验证码发送成功',
        success: true
      })
    }
  } catch (err) {
    res.status(400).json({
      errorMsg: '验证码发送失败',
      success: false
    })
  }
}

// check smsCode
exports.check = async (phoneNum, code) => {
  // 转换当下日期格式
  const sendDate = moment().format('YYYYMMDD')
  try {
    const res = await smsClient.queryDetail({
      PhoneNumber: phoneNum,
      SendDate: sendDate,
      PageSize: '1',
      CurrentPage: '1'
    })
    const { Code, SmsSendDetailDTOs } = res
    if (Code === 'OK') {
      // 处理发送详情内容
      const detail = SmsSendDetailDTOs.SmsSendDetailDTO[0]
      if (detail) {
        const content = detail.Content
        const pattern = /\d{6}/
        if (!content || !pattern.exec(content)) {
          return Promise.reject('出错，请重新获取验证码')
        }

        const realCode = pattern.exec(content)[0]
        if (realCode === code) {
          const receiveTime = Date.parse(detail.ReceiveDate)
          const now = Date.parse(new Date())
          const diffTime = (now - receiveTime) / 60000
          // 10分钟内验证码有效
          if (diffTime <= config.timeLimit) {
            return Promise.resolve(code)
          } else {
            return Promise.reject('验证码过期')
          }
        } else {
          return Promise.reject('验证码错误')
        }
      } else {
        return Promise.reject('验证码错误')
      }
    } else {
      return Promise.reject('验证码错误')
    }
  } catch (err) {
    console.log('check sms code err...', err)
    return Promise.reject('验证码错误')
  }
}
