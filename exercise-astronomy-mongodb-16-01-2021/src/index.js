const express = require('express');
const session = require('express-session');

require('./configs/db');
const passport = require('./configs/passport');
const routeMiddleware = require('./routes');

const app = express();

// Aquí el middleware correspondiente para parsear el body de la request!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: 'o387dh_*p2n8aywbeofna',
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Aquí el middleware donde se cargará la ruta principal
app.use('/astronomy', routeMiddleware);

const PORT = 4000;
app.listen(PORT, () => console.info(`> listening at http://localhost:${PORT}`));
