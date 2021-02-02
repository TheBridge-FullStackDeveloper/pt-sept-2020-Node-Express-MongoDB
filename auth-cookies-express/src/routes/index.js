const express = require('express')

const authRouter = require('./auth')

const router = express.Router()

// Connect all route subpaths from here on ⬇️
router.get('/', (_req, res) => res.sendStatus(200))
router.use('/auth', authRouter)

module.exports = router
