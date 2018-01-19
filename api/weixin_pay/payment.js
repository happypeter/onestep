const https = require('https')
const axios = require('axios')
const {md5, nonce, xml2json, json2xml} = require('./helper')

class WeixinPayment {
  constructor(opts = {}) {
    this.$opts = opts
    this.$req = axios.create({
      baseURL: 'https://api.mch.weixin.qq.com',
      timeout: 1000*5,
    })
  }

  sign(params) {
    const qs = Object.keys(params)
      .filter(key => key && params[key] && !['sign'].includes(key))
      .sort()
      .map(key => `${key}=${params[key]}`).join('&') + `&key=${this.$opts.mch_key}`
    return md5(qs).toUpperCase()
  }

  req(url, params) {
    const {appid, mch_id} = this.$opts
    Object.assign(params, {
      appid,
      mch_id,
      nonce_str: nonce()
    })
    params.sign = this.sign(params)
    const body = json2xml(params)
    return this.$req.post(url, body)
  }

  getCodeUrl(params = {}) {
    return this.req('/pay/unifiedorder', params)
      .then(res => {
        const result = xml2json(res.data)
        if (result.return_code === 'FAIL') {
          return Promise.reject(result.return_msg)
        }
        return Promise.resolve(result.code_url)
      })
  }
}

module.exports = WeixinPayment
