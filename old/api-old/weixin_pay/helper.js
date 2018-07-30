const crypto = require('crypto')
const json2xml = require('json2xml')
const xml2json = require('xml2json')

exports.md5 = str => {
  const hash = crypto.createHash('md5')
  return hash.update(str, 'utf8').digest('hex')
}

exports.nonce = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxPos = chars.length
  let nonceStr = ''
  for (let i = 0; i < length; i++) {
    nonceStr += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return nonceStr
}

exports.json2xml = json => json2xml({ xml: json }, { header: false })

exports.xml2json = xml => {
  const text = xml2json.toJson(xml)
  const json = JSON.parse(text)
  return json.xml
}
