// Este es el archivo principal de carga de rutas
const { Router } = require('express');

const mainRouter = require('./main');
const todosRouter = require('./todos');
const createError = require('../utils/createError');

const router = Router();

router.use('/', mainRouter);
router.use('/todos', todosRouter);

router.use('*', (req, res, next) => {
  try {
    createError('Not found', 404);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
