const COS = require('cos-nodejs-sdk-v5')
const config = require('../config/config')

const params = {
  AppId: `${config.AppId}`,
  SecretId: `${config.SecretId}`,
  SecretKey: `${config.SecretKey}`,
  Bucket: `${config.Bucket}`,
  Region: `${config.Region}`,
  // Output : 'WRITE_STREAM',
}

const cos = new COS(params)

exports.getBucket = (req, res) => {
  console.log('bucket')
  cos.getBucket(params, function (err, data) {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      // console.log(data)  
      res.status(200).json(data)
    }
  })
}

exports.getObject = (req, res) => {
  console.log('get single obj')
  let Key = req.body.Key
  // let objParams = {
  //    ...params,
  //    Key: key
  // }
  params.Key = Key
  // console.log(Key);
  // console.log(params);
  // console.log(objParams);
  cos.getObject(params, function(err, data) {
    if(err) {
      console.log(err);
      res.json(err)
    } else {
      // console.log(data);
      res.status(200).json(data)
    }
  });
}
