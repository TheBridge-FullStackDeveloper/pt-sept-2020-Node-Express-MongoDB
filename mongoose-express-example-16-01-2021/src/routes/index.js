const router = require('express').Router()

router.use('/books', require('./books'))

module.exports = router