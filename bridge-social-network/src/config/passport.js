const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use('register' /*...*/);

// req.body => req.body.email & req.body.password
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });

      // Chequeamos que el usuario que buscamos existe en la DB
      if (!user) {
        const error = new Error('User does not exist');
        return done(error, null);
      }

      const isValidPassword = bcrypt.compareSync(password, user.get('password'));

      if (!isValidPassword) {
        const error = new Error('Invalid email & password combination');
        return done(error, null);
      }

      // Como tengo un user válido y una contraseña válida, resuelvo el done sin error y con el user
      done(null, user);
    }
  )
);

// Cuando el user hace req.logIn se serializa y creo su cookie de sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// A través de la id de la cookie, busco al user en la DB y lo inyecto en req.user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
