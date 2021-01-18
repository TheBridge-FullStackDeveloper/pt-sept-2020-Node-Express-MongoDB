const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const appRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const setupApp = (app) => {
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // app.set('trust proxy', 1);;

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(appRouter);
  app.use(errorHandler);

  return app;
};

module.exports = setupApp;
