const { Router } = require('express');

// const createError = require('../utils/createError');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    // Ejemplo usando un query param para validar el usuario
    // const { code } = req.query;
    // if (code !== '1234') {
    //   createError('Invalid authentication code', 401);
    // }

    res.status(200).send('Server alive!');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
