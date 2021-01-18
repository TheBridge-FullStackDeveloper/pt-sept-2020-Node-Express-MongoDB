// Traemos el paquete "express" de node_modules y
// lo asignamos a la constante express
const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');

const appRouter = require('./routes');

// Importo los middlewares que quiero usar en las rutas
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Invocamos express para crear un servidor listo para usar
const app = express();

const setupApp = (app) => {
  // Añadimos un middleware de login para servidor
  app.use(morgan);
  // Añadimos un middleware para seguridad de cabeceras
  app.use(helmet);
  // Esto permite a Express reconocer req.body (usa body-parser)
  app.use(express.json());
  // Esto permite a Express parsear los URL query params a objeto en req.query
  app.use(express.urlencoded({ extended: false }));
  // Cuando lanzo una request a http://localhost:PORT entro al router
  app.use('/', logger, appRouter);

  app.use(errorHandler);
};

module.exports = setupApp(app);
