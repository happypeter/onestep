const express = require('express')
const app = express()
const logger = require('morgan')

const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes')

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', cors(), apiRouter)

// 处理开发环境报错
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500)
    res.json({ success: false, errorMsg: err.message })
  })
}

// 处理生产环境报错
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500)
  res.json({ success: false, errorMsg: err.message })
})

app.listen(3000, () => console.log('running on port 3000...'))
