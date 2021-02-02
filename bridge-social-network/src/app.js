const express = require('express');

require('./config/db');
const appRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', appRouter);

// Este middleware de errores solo debe existir una vez
app.use((err, req, res, next) => {
  // Añadimos un log del error para debugging
  console.error(err);

  res.status(err.code || 500).json({
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`Server running in http://localhost:${PORT}`);
});
