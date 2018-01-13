const SMSClient = require('@alicloud/sms-sdk')
const config = require('../config/config')
const moment = require('moment')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = config.accessKeyId
const secretAccessKey = config.secretAccessKey

// 在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
// const queueName = config.queueName

// 初始化sms_client
const smsClient = new SMSClient({accessKeyId, secretAccessKey})

// 发送短信
exports.send = (req, res) => {
  const phoneNum = req.body.phoneNum
  // 六位随机验证码
  const smsCode = Math.random().toString().slice(-6)
  smsClient
    .sendSMS({
      PhoneNumbers: phoneNum,
      SignName: config.SignName,
      TemplateCode: config.TemplateCode,
      TemplateParam: `{"code": "${smsCode}"}`,
    })
    .then(
      function(smsRes) {
        let {Code} = smsRes
        if (Code === 'OK') {
          return res.status(200).json({
            message: '已成功发送短信',
            success: true,
          })
        }
      },
      function(err) {
        return res.status(403).json({
          errorMsg: err,
          success: false,
        })
      },
    )
    .catch(err => {
      console.log(err)
    })
}

// check smsCode
exports.check = (phoneNum, code) => {
  // 转换当下日期格式
  const sendDate = moment().format('YYYYMMDD')

  return new Promise((resolve, reject) => {
    // 查询短信发送详情
    smsClient
      .queryDetail({
        PhoneNumber: phoneNum,
        SendDate: sendDate,
        PageSize: '1',
        CurrentPage: '1',
      })
      .then(
        function(res) {
          const {Code, SmsSendDetailDTOs} = res
          if (Code === 'OK') {
            // 处理发送详情内容
            const detail = SmsSendDetailDTOs.SmsSendDetailDTO[0]
            if (detail) {
              const content = detail.Content
              const pattern = /\d{6}/
              if (!content || !pattern.exec(content)) {
                reject('出错 请重新获取验证码')
              }
              let realCode = pattern.exec(content)[0]
              if (realCode === code) {
                let receiveTime = Date.parse(detail.ReceiveDate)
                let now = Date.parse(new Date())
                // 一分钟60000ms
                let difftime = (now - receiveTime) / 60000
                if (difftime <= config.timeLimit) {
                  resolve(code)
                } else {
                  reject('验证码过期')
                }
              } else {
                reject('验证码错误')
              }
            } else {
              reject('验证码错误')
            }
          }
        },
        function(err) {
          console.log(err)
        }
      )
  })
}
