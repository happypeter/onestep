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

routes(app)

app.listen(port, function () {
  console.log(port)
})
