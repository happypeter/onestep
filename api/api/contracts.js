const WeixinPayment = require('../weixin_pay/payment')
const Contract = require('../models/contract')
const config = require('../config/config')
const moment = require('moment')
const { json2xml } = require('../weixin_pay/helper')
const Catalogue = require('../models/catalogue')

const { serviceAppId, mchId, mchKey } = config
const wxpay = new WeixinPayment({
  appid: serviceAppId,
  mch_id: mchId,
  mch_key: mchKey,
})

const membershipOneMonth = 42
const membershipThreeMonths = 90
// 创建合同
exports.new = (req, res) => {
  const contract = new Contract()
  let body = ''
  if (req.body.courseId) {
    // 购买课程
    const { courseId, name } = req.body
    contract.courseId = courseId
    body = name
  } else {
    // 购买会员服务
    const now = moment()
    contract.startDate = moment(now).format('YYYY-MM-DD')
    if (req.body.total === membershipThreeMonths) {
      body = '购买三个月会员服务'
      contract.expireDate = moment(now)
        .add(3, 'month')
        .format('YYYY-MM-DD')
    }
    if (req.body.total === membershipOneMonth) {
      body = '购买一个月会员服务'
      contract.expireDate = moment(now)
        .add(1, 'month')
        .format('YYYY-MM-DD')
    }
  }
  contract.total = req.body.total
  contract.status = '未支付'
  contract.userId = req.userId
  contract.outTradeNo =
    Date.now() +
    Math.random()
      .toString()
      .substr(2, 12)
  contract
    .save()
    .then(contract => {
      // 网页微信扫码支付
      const payInfo = {
        body,
        out_trade_no: contract.outTradeNo,
        total_fee: Math.floor(req.body.total * 100),
        spbill_create_ip: config.spbillCreateIP,
        notify_url: config.wxNotifyUrl,
        trade_type: 'NATIVE',
      }

      wxpay
        .getCodeUrl(payInfo)
        .then(codeUrl => res.status(200).json({ codeUrl, contractId: contract._id }))
        .catch(error => {
          console.log('payment error...', error)
        })
    })
    .catch(() =>
      res.status(500).json({
        errorMsg: '不能创建订单',
        success: false,
      })
    )
}

exports.notifyUrl = (req, res) => {
  const result = req.body.xml
  const flag =
    result.return_code === 'SUCCESS' &&
    result.result_code === 'SUCCESS' &&
    result.sign === wxpay.sign(result)
  if (flag) {
    Contract.findOne({ outTradeNo: result.out_trade_no })
      .exec()
      .then(contract => {
        if (contract && Math.floor(contract.total * 100) === Number(result.total_fee)) {
          if (contract.status === '未支付') {
            contract.status = '已支付'
            contract.save()
          }
          return res.send(json2xml({ return_code: 'SUCCESS' }))
        }
        return res.send(json2xml({ return_code: 'FAIL' }))
      })
      .catch(() => res.send(json2xml({ return_code: 'FAIL' })))
  } else {
    return res.send(json2xml({ return_code: 'FAIL' }))
  }
}

exports.status = (req, res) => {
  const type = req.query.type
  if (type === 'course') {
    Promise.all([
      Contract.findById({ _id: req.params.contractId })
        .populate('courseId', 'courseName')
        .exec(),
      Catalogue.find().exec(),
    ])
      .then(result => {
        if (!result.length) return
        const course = result[1].find(c => c.link.slice(1) === result[0].courseId.courseName)
        return res.status(200).json({
          success: true,
          status: result[0].status,
          course: { ...course._doc, total: result[0].total },
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  if (type === 'member') {
    Contract.findById({ _id: req.params.contractId })
      .exec()
      .then(contract => {
        if (!contract) return
        const { startDate, expireDate, total } = contract
        const now = moment()
        const data = {}
        data.total = total
        if (now.isBefore(expireDate, 'day')) {
          data.isExpired = false
        } else {
          data.isExpired = true
        }
        data.startDate = moment(startDate).format('YYYY-MM-DD')
        data.expireDate = moment(expireDate).format('YYYY-MM-DD')
        data.duration = moment(expireDate).diff(startDate, 'months')
        return res.status(200).json({
          success: true,
          status: contract.status,
          member: data,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
