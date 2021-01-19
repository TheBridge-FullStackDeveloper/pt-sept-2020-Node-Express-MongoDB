// Aquí configuración de conexión a la base de datos
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/astronomy';

mongoose
  .connect(DB_URI)
  .then(() => {
    console.info('Connected to DB!');
  })
  .catch((err) => console.error(err));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});
