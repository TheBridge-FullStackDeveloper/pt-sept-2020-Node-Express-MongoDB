const router = require('express').Router();

const passport = require('../config/passport');
const { throwError } = require('../utils/common.utils');

// Crear un endpoint /register que a través de passport.authenticate('register')
// introduzca el user en la DB y me devuelva el user logeado. (req.logIn)
router.post('/register', () => {})

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (error, user) => {
    if (error) {
      return throwError(error.message, 401)(next);
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return throwError(loginErr.message, 401)(next);
      }

      res.status(200).json({ data: user });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logOut();

  // Como añadido al caducar de las cookies, las vamos a borrar del cliente
  res.clearCookie('express:sess');
  res.clearCookie('express:sess.sig');

  res.status(200).json({ data: 'OK' });
});

module.exports = router;
