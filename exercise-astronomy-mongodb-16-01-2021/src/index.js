const express = require('express');
const app = express();

require('./configs/db');
const mainRouter = require('./routes');

// Aquí el middleware correspondiente para parsear el body de la request!
app.use(express.json());

// Aquí el middleware donde se cargará la ruta principal
app.use('/', mainRouter);

app.listen(3000, () => console.info('> listening at http://localhost:3000'));
