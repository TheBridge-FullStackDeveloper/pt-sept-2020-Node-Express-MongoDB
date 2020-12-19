const app = require('./app');

// LANZAMOS EL SERVIDOR
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
