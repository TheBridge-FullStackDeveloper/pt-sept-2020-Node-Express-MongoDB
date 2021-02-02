const express = require('express')
const app = express()
// const geo = require('mapbox-geocoding');
// Aquí el middleware correspondiente para parsear el body de la request!
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Aquí el middleware donde se cargará la ruta principal

require('./configs/db')
const geo = require('mapbox-geocoding');
const ACCESS_TOKEN = "pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog"
 geo.setAccessToken('ACCESS_TOKEN');

app.use("/astronomy",require("./routes"))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use((req, res, next) => {
  next(new Error('path not found'))
})

app.use((error, req, res, next) => {
  res.status(400).json({
    success: false,
    message: error.message
  })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});

