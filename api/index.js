const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes')
const config = require('./config/config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.url, {
  useMongoClient: true
})
const db = mongoose.connection
db.on('error', console.log)
db.once('open', function() {
  require('./models/user')
  require('./models/contract')
  console.log('db connection success!')
})

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', cors(), apiRouter)

app.use(function(err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500)
  res.json({ success: false, errorMsg: err.message })
})

app.listen(3001, () => console.log('running on port 3001...'))
