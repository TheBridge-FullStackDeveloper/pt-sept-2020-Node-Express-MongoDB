// Traemos el paquete "express" de node_modules y
// lo asignamos a la constante express
const express = require('express');

const mainRouter = require('./routes/main');
const studentsRouter = require('./routes/students');

// Invocamos express para crear un servidor listo para usar
const app = express();

// CONFIGURACIÓN DE APP
// Esto permite a Express reconocer req.body (usa body-parser)
app.use(express.json());
// Esto permite a Express parsear los URL query params a objeto en req.query
app.use(express.urlencoded({ extended: false }));
// Cuando lanzo una request a http://localhost:PORT entro al router
app.use('/', mainRouter);
app.use('/students', studentsRouter);

// A este middleware entramos siempre que next(err) reciba un Error de JS
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error.message);
});
// FIN DE CONFIGURACIÓN DE APP

// LANZAMOS EL SERVIDOR
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
