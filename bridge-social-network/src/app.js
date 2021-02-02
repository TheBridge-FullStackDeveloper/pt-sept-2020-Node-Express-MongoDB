// El primer require será dotenv para setear las variables de entorno
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

require('./config/db');
const passport = require('./config/passport');
const appRouter = require('./routes');

const app = express();

// Cors será el primer middleware que configuremos
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuramos las cookies y passport
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // milliseconds of a day
    keys: [process.env.COOKIE_KEY || 'cookie-auth-the-bridge'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', appRouter);

// Este middleware de errores solo debe existir una vez
app.use((err, req, res, next) => {
  // Añadimos un log del error para debugging
  console.error(err);

  res.status(err.code || 500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server running in http://localhost:${PORT}`);
});
