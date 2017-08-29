const crypto = require('crypto')
module.exports = function getAuth (opt) {
  let getObjectKeys = function (obj) {
    let list = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        list.push(key)
      }
    }
    return list.sort()
  }
  let obj2str = function (obj) {
    let i, key, val
    let list = []
    let keyList = Object.keys(obj)
    for (i = 0; i < keyList.length; i++) {
      key = keyList[i]
      val = obj[key] || ''
      key = key.toLowerCase()
      key = camSafeUrlEncode(key)
      list.push(key + '=' + camSafeUrlEncode(val))
    }
    return list.join('&')
  }
  let camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
  }
  let SecretId = opt.SecretId
  let SecretKey = opt.SecretKey
  let method = (opt.method || 'get').toLowerCase()
  let pathname = opt.pathname || '/'
  let queryParams = opt.params || ''
  let headers = opt.headers || ''
  let now = parseInt(new Date().getTime() / 1000) - 1
  let expired = now
  if (opt.expires === undefined) {
    expired += 3600
  } else {
    expired += (opt.expires * 1) || 0
  }

  let qSignAlgorithm = 'sha1'
  let qAk = SecretId
  let qSignTime = now + ';' + expired
  let qKeyTime = now + ';' + expired
  let qHeaderList = getObjectKeys(headers).join(';').toLowerCase()
  let qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase()
  // 步骤一：计算 SignKey
  let signKey = crypto.createHmac('sha1', SecretKey).update(qKeyTime).digest('hex')

  // 步骤二：构成 FormatString
  let formatString = [method, pathname, obj2str(queryParams), obj2str(headers), ''].join('\n')

  formatString = new Buffer(formatString, 'utf8')

  // 步骤三：计算 StringToSign
  let sha1Algo = crypto.createHash('sha1')
  sha1Algo.update(formatString)
  let res1 = sha1Algo.digest('hex')
  let stringToSign = ['sha1', qSignTime, res1, ''].join('\n')

  // 步骤四：计算 Signature
  let qSignature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex')

  // 步骤五：构造 Authorization
  let Authorization = [
    'q-sign-algorithm=' + qSignAlgorithm,
    'q-ak=' + qAk,
    'q-sign-time=' + qSignTime,
    'q-key-time=' + qKeyTime,
    'q-header-list=' + qHeaderList,
    'q-url-param-list=' + qUrlParamList,
    'q-signature=' + qSignature
  ].join('&')
  return Authorization
}
