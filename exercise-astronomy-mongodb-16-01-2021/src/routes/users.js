const route = require('express').Router();

const passport = require('../configs/passport');

// Endpoints relativos a Users
route.post('/', (req, res, next) => {
  try {
    passport.authenticate('register', (err, user) => {
      if (err) {
        throw err;
      }

      res.status(200).json({ data: user });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err.message });
  }
});

module.exports = route;
