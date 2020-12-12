const express = require('express')
const bodyParser = require('body-parser')
const { SERVER_PORT } = require('./constants')
// We need require proper beers routes module
// ...

const app = express()

app.use(bodyParser.json())

// We need create app.use with basic route and previously required beers routes module
// ...

app.listen(SERVER_PORT, () => {
  console.info(`> server is listening on ${SERVER_PORT} port`)
})

