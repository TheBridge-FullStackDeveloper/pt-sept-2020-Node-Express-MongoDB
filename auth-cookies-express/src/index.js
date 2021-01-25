require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const cookieSession = require('cookie-session')

require('./config/db')
require('./config/passport')
const apiRouter = require('./routes')

const server = express()

server.use(
  cors({
    origin: true, // Easy cors origin validation for development purposes
    credentials: true,
  })
)
server.use(express.json())
server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // milliseconds of a day
    keys: [process.env.COOKIE_KEY || 'express-auth-cookie']
  })
)

server.use(passport.initialize())
server.use(passport.session())

// Fetch or curl http://localhost:4000/api to acces this server endpoints
server.use('/api', apiRouter)

// Server general basic error handler 🚨
server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Server listening in http://locahost:${PORT}`)
})
