const COS = require('cos-nodejs-sdk-v5')
const config = require('../config/config')

const params = {
  AppId: `${config.AppId}`,
  SecretId: `${config.SecretId}`,
  SecretKey: `${config.SecretKey}`,
  // Bucket: `${config.Bucket}`,
  // Region: `${config.Region}`,
  // Output : 'WRITE_STREAM',
  Method: 'get',                          /* 必须 */
}

const cos = new COS(params)
// const Authorization = cos.getAuth(params);
exports.auth = (req, res) => {
  console.log('auth');
  const Authorization = cos.getAuth(params)
  console.log(Authorization);
  res.status(200).json(Authorization)
}
