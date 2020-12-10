const express = require('express')
const fs = require('fs')
const { errorManager } = require('./utils')
const { ACCESS_FILE, TEST_FILE, PORT } = require('./constants')

const app = express()

app.get('/file', (req, res) => {
  fs.readFile(TEST_FILE, function (error, fileData) {
    if (!error) {

      fs.readFile(ACCESS_FILE, function (error, data) {
        if (!error) {
          const newData = data.toString()
          const numberData = Number(newData) + 1

          fs.writeFile(ACCESS_FILE, numberData.toString(), function (error) {
            if (!error) {
              res.send(fileData.toString())
            }
          })
        }
      })
    } else {
      errorManager(res, error)
    }
  })
})

app.get('/count', (req, res) => {
  fs.readFile(ACCESS_FILE, function (error, data) {
    if (!error) {
      res.send(data.toString())
    } else {
      errorManager(res, error)
    }
  })
})

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`)
})