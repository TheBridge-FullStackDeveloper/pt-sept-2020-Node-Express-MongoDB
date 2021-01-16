const express = require('express')
const bodyParser = require('body-parser')
require('./configs/db')

const app = express()
app.use(bodyParser.json())

app.use('/', require('./routes'))

app.use((req, res, next) => {
  next(new Error('path not found'))
})

app.use((error, req, res, next) => {
  res.status(400).json({
    success: false,
    message: error.message
  })
})

app.listen(3000, () => console.info('> listening at http://localhost:3000'))