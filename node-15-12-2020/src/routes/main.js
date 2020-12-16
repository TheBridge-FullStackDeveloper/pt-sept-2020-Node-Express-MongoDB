const express = require('express');

const router = express.Router();

// http://localhost:PORT/
router.get('/', (req, res, next) => {
  res.status(200).send('Hello World!');
});

// http://localhost:PORT/ping
router.get('/ping', (req, res, next) => {
  res.status(200).send('Pong!');
});

// http://localhost:PORT/info
router.get('/info', (req, res, next) => {
  res.status(200).json({
    company: 'The Bridge',
    month: 'September',
    year: 2020,
    bootcamp: 'Full Stack Part Time',
  });
});

module.exports = router;
