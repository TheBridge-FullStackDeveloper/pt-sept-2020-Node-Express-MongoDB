require('dotenv').config();
const express = require('express');

const setupApp = require('./app');
const { PORT } = require('./config/constants');

const app = setupApp(express());

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
