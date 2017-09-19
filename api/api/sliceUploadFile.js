// var COS = require('cos-nodejs-sdk-v5');
// const fs = require('fs')
// const config = require('../config/config')
//
//
// // 创建实例
// var cos = new COS({
//   AppId: `${config.AppId}`,
//   SecretId: `${config.SecretId}`,
//   SecretKey: `${config.SecretKey}`,
// });
//
//
// exports.sliceUploadFile = (req, res) => {
//   console.log('sliceUploadFile')
// //   fs.access('', (err) => {
// //   if (!err) {
// //     console.error('myfile already exists');
// //     return;
// //   }
// // })
// console.log(process.cwd());
//
//   // 分片上传
//   cos.sliceUploadFile({
//       Bucket: `${config.Bucket}`,
//       Region: `${config.Region}`,
//       Key: 'mpj.png',
//       FilePath: './api/mpj.png'
//   }, function (err, data) {
//     if (err) {
//       console.log(err)
//       res.json(err)
//     } else {
//       console.log(data)
//       res.status(200).json(data)
//     }
//   })
// }
