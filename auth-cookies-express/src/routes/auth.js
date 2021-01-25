const express = require('express')
const passport = require('passport')

const { isAuthenticated } = require('../middlewares/authentication')

const router = express.Router()

// Get user profile only if user has a valid authenticated cookie
router.get('/profile', [isAuthenticated], (req, res) => res.status(200).json(req.user))

// Google endpoints accesibe in http://localhost:XXXX/api/auth/google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // Redirect to the web client after valid authentication
  res.status(200).redirect(process.env.CLIENT_URL || 'http://localhost:3000')

  // Use this for server testing purposes...
  // res.status(200).json({ data: req.user })
})

router.post('/register', passport.authenticate('register'), (req, res) =>
  res.status(200).json({ data: req.user })
)

router.post('/login', passport.authenticate('login'), (req, res) =>
  res.status(200).json({ data: req.user })
)

router.get('/logout', (req, res) => {
  // Logout using the passport added logout method
  req.logout()

  // Send user to check if it's really logged out
  res.status(200).json({ data: 'OK' })
})

module.exports = router
