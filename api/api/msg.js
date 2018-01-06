const SMSClient = require('@alicloud/sms-sdk')
const config = require('../config/config')
const moment = require('moment')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = config.accessKeyId
const secretAccessKey = config.secretAccessKey

// 在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
// const queueName = config.queueName

// 初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

// 发送短信
exports.send = (req, res) => {
  let phoneNum = req.body.phoneNum
  // 六位随机验证码
  let smsCode = Math.random()
    .toString()
    .slice(-6)
  while (smsCode.length !== 6) {
    smsCode = Math.random()
      .toString()
      .slice(-6)
  }
  smsClient
    .sendSMS({
      PhoneNumbers: phoneNum,
      SignName: config.SignName,
      TemplateCode: config.TemplateCode,
      TemplateParam: `{"number":${JSON.stringify(smsCode)}}`,
    })
    .then(
      function(smsRes) {
        let {Code} = smsRes
        if (Code === 'OK') {
          console.log('已成功发送短信')
          return res.status(200).json({
            message: '已成功发送短信',
            success: true,
          })
        }
      },
      function(err) {
        console.log('短信发送失败')
        console.log(err)
        return res.status(403).json({
          errorMsg: err,
          success: false,
        })
      }
    )
    .catch(err => {
      console.log(err)
    })
}

// check smsCode
exports.check = (phoneNum, code) => {
  // 转换当下日期格式
  let sendDate = moment().format().substr(0, 10).split('-').join('')

  let promise = new Promise((resolve, reject) => {
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
          let {Code, SmsSendDetailDTOs} = res
          if (Code === 'OK') {
            // 处理发送详情内容
            let detail = SmsSendDetailDTOs.SmsSendDetailDTO[0]
            if (detail) {
              let content = detail.Content
              let pattern = /\d{6}/
              if (!content || !pattern.exec(content)) {
                console.log('出错 请重新获取验证码')
                reject('SMS_ERR_TRY_AGAIN')
              }
              let realCode = pattern.exec(content)[0]
              if (realCode === code) {
                let receiveTime = Date.parse(detail.ReceiveDate)
                let now = Date.parse(new Date())
                // 一分钟60000ms
                let difftime = (now - receiveTime) / 60000
                if (difftime <= config.timeLimit) {
                  resolve('pass')
                } else {
                  console.log('验证码过期')
                  reject('EXPIRED_SMS_CODE')
                }
              } else {
                console.log('验证码错误')
                reject('SMS_CODE_IS_INVALID')
              }
            } else {
              console.log(`${sendDate + '无验证码记录'}`)
              reject('SMS_NO_RECORED')
            }
          }
        },
        function(err) {
          // 处理错误
          console.log(err)
          reject(err)
        }
      )
  })

  return promise
}
