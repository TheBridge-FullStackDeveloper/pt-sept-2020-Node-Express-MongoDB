const bcrypt = require('bcrypt');
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
    async (req, email, password, done) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('Este email ya está en uso');
        done(error, null);
        return;
      }

      // Aquí añadiré el resto de campos que vengan en req.body si son necesarios en el modelo
      const newUser = new User({
        email,
        name: req.body.name,
        password: bcrypt.hashSync(password, 10),
      });

      newUser
        .save()
        .then(() => {
          done(null, newUser);
        })
        .catch((err) => {
          done(err, null);
        });
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      passwordField: 'password', // Este campo del body lo convertimos en el segundo argumento del callback
      usernameField: 'email', // Este campo del body lo convertimos en el primer argumento del callback
    },
    async (email, password, done) => {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const error = new Error(
          'No existen usuarios con este email y/o contraseña'
        );
        done(error, null);
        return;
      }

      // El password que el usuario envía en el body se comprueba contra
      // el password que tenemos encrypted en la base de datos
      const isPasswordValid = bcrypt.compareSync(
        password,
        existingUser.get('password')
      );

      if (!isPasswordValid) {
        const error = new Error('Combinación email y contraseña errónea');
        done(error, null);
        return;
      }

      done(null, existingUser);
    }
  )
);

// done es un callback. Los callbacks de Passport se suelen llamar done
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// El callback done recibe dos argumentos.
// error => Si se envía, la función que invoca al serialize/deserialize llega recibe el error
// user => Información del usuario que se intenta autenticar y recogemos de la DB
passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
