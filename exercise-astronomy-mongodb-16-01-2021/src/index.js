const express = require('express')
const app = express()

// Aquí el middleware correspondiente para parsear el body de la request!

// Aquí el middleware donde se cargará la ruta principal

app.listen(3000,
  () => console.info('> listening at http://localhost:3000')
)