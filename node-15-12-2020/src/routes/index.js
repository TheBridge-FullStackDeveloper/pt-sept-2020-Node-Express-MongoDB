// Este archivo se comporta como un gestor de rutas
const express = require('express');

const mainRouter = require('./main');
const studentsRouter = require('./students');
const beersRouter = require('./beers');

const router = express.Router();

router.use('/', mainRouter);
router.use('/students', studentsRouter);
router.use('/beers', beersRouter);

module.exports = router;
