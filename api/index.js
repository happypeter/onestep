const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes')
const adminRouter = require('./admin_routes')
const config = require('./config/config')
const mongoose = require('mongoose')

const app = express()
mongoose.Promise = global.Promise
mongoose.connect(config.url, {
  useMongoClient: true
})
const db = mongoose.connection
db.on('error', console.log)
db.once('open', () => {
  console.log('db connection success!')
})

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', cors(), apiRouter)
app.use(`/${config.adminRouter}`, cors(), adminRouter)

app.listen(config.port, () => console.log(`running on port ${config.port}...`))
