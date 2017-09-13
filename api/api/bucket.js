const COS = require('cos-nodejs-sdk-v5')
const config = require('../config/config')

const params = {
  AppId: `${config.AppId}`,
  SecretId: `${config.SecretId}`,
  SecretKey: `${config.SecretKey}`,
  Bucket: `${config.Bucket}`,
  Region: `${config.Region}`
}

const cos = new COS(params)

exports.get = (req, res) => {
  console.log('bucket')
  cos.getBucket(params, function (err, data) {
    if (err) {
      console.log(err)
      res.status(200).json(err)
    } else {
      console.log(data)
      res.status(200).json(data)
    }
  })
}
