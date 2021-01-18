const express = require('express');

const students = require('../db/students.json');

const router = express.Router();

// http://localhost:PORT/students?offset=0
router.get('/', (req, res, next) => {
  try {
    // Usando req.query obtengo un objeto con los query params enviados
    // const offset = req.query.offset || 0
    const { offset = 0 } = req.query;
    const numOffset = Number(offset);

    if (Number.isNaN(numOffset)) {
      // Si next() recibe un objeto de tipo Error, accede al middleware de errores de Express
      throw new Error('Offset should be a number');
    }

    const studentsToSend = students.slice(numOffset, numOffset + 3);
    res.status(200).json(studentsToSend);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
