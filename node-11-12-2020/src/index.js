const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const phonesRoute = require('./routes/phones')

const PORT = 3000

app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.use('/phones', phonesRoute)

app.listen(PORT, () => {
  console.info(`> listening on port ${PORT}`)
})