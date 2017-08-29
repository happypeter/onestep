var express = require('express')
var app = express()
var port = require('./config/config.js').port
var uri = require('./config/config.js').uri
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var routes = require('./routes')
var morgan = require('morgan')

app.use(morgan('dev'))

mongoose.connect(uri)

var db = mongoose.connection
db.on('error', function (err) {
  console.log('connection failed!', err)
})
db.once('open', function () {
  console.log('success!')
})

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

routes(app)

app.listen(port, function () {
  console.log(port)
})
