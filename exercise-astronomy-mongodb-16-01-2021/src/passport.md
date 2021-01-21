## Autenticación con Passport (Sesiones)

1. Instalar **Passport** y **Express Session**. El primero gestionará el proceso de autenticación y el segundo gestionará el guardado de sesiones en la DB.

2. Importamos las librerías passport y express-session en el index.js del proyecto y configuramos los middleware:

```
const passport = require('passport');
const session = require('express-session');

// Añadimos los middlwewares
app.use(
  session({
    secret: 'o387dh_*p2n8aywbeofna',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
```

3. El siguiente paso será añadir los serialize y deserialize a passport. Creamos un archivo `/configs/passport.js` e introducimos el siguiente código:

- El **serialize** crea una token/hash de autenticación para un usario autenticado con éxito.
- El **deserialize** busca un usuario en la DB dada la id contenida en su token/hash.

```
const passport = require('passport');

const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
```

Importaremos **passport** en nuestro index.js esta vez desde nuestro archivo en vez de importar el módulo global.

4. Crearemos el modelo **User** con al menos un campo email y un campo password. Ambos serán requeridos y el email será único.

```
const mongoose = require('mongoose');

// 1. Creo el esquema del modelo
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 2. Creo el modelo y lo exporto
const User = mongoose.model('User', userSchema);
module.exports = User;
```

5. Añadimos una estrategia de autenticación a **Passport**. En este caso usaremos passport-local para crear un **método de autenticación con username/email y contraseña**. En el archivo **config/passport.js** introducimos:

```
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
```

Y añadimos un nuevo endpoint (en este caso /astronomy/users/) de tipo **POST** para enviar información a nuestro servidor en un body y poder testear desde Postman:

```
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
```
