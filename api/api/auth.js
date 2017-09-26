const COS = require('cos-nodejs-sdk-v5')
const config = require('../config/config')

exports.auth = (req, res) => {
  console.log('auth')
  // console.log(req.body.method);
  // console.log(req.body.pathname);
  const params = {
    AppId: `${config.AppId}`,
    SecretId: `${config.SecretId}`,
    SecretKey: `${config.SecretKey}`,
    // Bucket: `${config.Bucket}`,
    // Region: `${config.Region}`,
    // Output : 'WRITE_STREAM',
    Method: req.body.method,
    Key: req.body.pathname
  }

  const cos = new COS(params)

  const Authorization = cos.getAuth(params)
  // console.log(Authorization)
  res.status(200).json(Authorization)
}
