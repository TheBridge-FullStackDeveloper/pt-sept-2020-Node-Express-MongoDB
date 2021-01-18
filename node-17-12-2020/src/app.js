require('dotenv').config();

// Uso fs para leer y escribir archivos
const fs = require('fs');
// Uso path para crear caminos absolutos a mis archivos y carpetas
const path = require('path');
// Creo un string con el camino absoluto a categories.json para leer y escribir
// sin problemas en cualquier entorno
const categoriesPath = path.join(__dirname, './db/categories.json');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/read', (req, res) => {
  // Leo el archivo de categories.json cada vez que entro al endpoint
  // para tener la información actualizada siempre.
  fs.readFile(categoriesPath, (err, data) => {
    // Convierto los datos del archivo al JSON que quiero
    const categories = JSON.parse(data);

    res.status(200).json(categories);
  });
});

app.use('/write', (req, res) => {
  fs.readFile(categoriesPath, (err, data) => {
    const categories = JSON.parse(data);

    const newCategories = [
      ...categories,
      {
        id: 9,
        name: 'motos',
      },
    ];

    fs.writeFile(categoriesPath, JSON.stringify(newCategories), () => {
      res.status(200).json(newCategories);
    });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});
