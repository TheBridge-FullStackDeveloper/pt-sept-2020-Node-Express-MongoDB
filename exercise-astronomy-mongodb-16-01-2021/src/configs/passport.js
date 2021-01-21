const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/User');

// Añadimos estrategia local con email y contraseña
passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true, // Pasamos el req de Express como primer argumento del callback
      passwordField: 'password', // Este campo del body lo convertimos en el tercer argumento del callback
      usernameField: 'email', // Este campo del body lo convertimos en el segundo argumento del callback
    },
    (req, email, password, done) => {
      console.log('Dentro de passport!');
      console.log({ email, password });

      done(null, userFromMongo);
    }
  )
);

// done es un callback. Los callbacks de Passport se suelen llamar done
passport.serializeUser((user, done) => done(null, user._id));

// El callback done recibe dos argumentos.
// error => Si se envía, la función que invoca al serialize/deserialize llega recibe el error
// user => Información del usuario que se intenta autenticar y recogemos de la DB
passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
