const express = require('express')
const fs = require('fs')
const router = express.Router()

const PHONE_DB = 'src/dbs/phones.json'

router.get('/', (req, res) => {
  fs.readFile(PHONE_DB, function (err, data) {
    if (!err) {
      res.status(200).json({
        success: true,
        data: JSON.parse(data)
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong'
      })
    }
  })
})

// REGISTER CON CALLBACKS
//
// router.post('/register', (req, res) => {
//   fs.readFile(PHONE_DB, function (err, data) {
//     if (!err) {
//       const newInfo = JSON.parse(data).concat(req.body)
//       fs.writeFile(PHONE_DB, JSON.stringify(newInfo), function (err, data) {
//         if (!err) {
//           res.status(200).json({
//             success: true,
//             data: newInfo
//           })
//         } else {
//           res.status(418).json({
//             success: false,
//             message: 'I am a teapot!'
//           })
//         }
//       })
//     } else {
//       console.error('> error: ', error.message)
//       res.status(418).json({
//         success: false,
//         message: 'I am a teapot!'
//       })
//     }
//   })
// })

// REGISTER CON ASYNC / AWAIT (SIN TRY / CATCH)
router.post('/register', async (req, res) => {
  const phonesList = await fs.readFileSync(PHONE_DB)
  const phonesJson = JSON.parse(phonesList)
  const newList = [...phonesJson, req.body]
  await fs.writeFileSync(PHONE_DB, JSON.stringify(newList))
  res.status(200).json({
    success: true,
    data: newList
  })
})

router.get('/:brand', async (req, res) => {
  console.info('> params: ', req.params)
  const phonesList = await fs.readFileSync(PHONE_DB)
  const phonesJson = JSON.parse(phonesList)
  const filteredList = phonesJson.filter(phone => {
    return phone.brand.toLowerCase() === req.params.brand.toLowerCase()
  })
  console.info('> list: ', filteredList)
  res.status(200).json({
    success: true,
    data: filteredList
  })
})

module.exports = router