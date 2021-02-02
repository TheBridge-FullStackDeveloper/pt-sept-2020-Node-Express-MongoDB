const route = require('express').Router()
// const fetch = require("node-fetch");
//  const geo = require('mapbox-geocoding');

// Middleware para el enrutado de Landings
route.use("/landings", require("./landings"))
// Middleware para el enrutado de los NEAs
route.use("/neas", require("./neas"))
// Middleware para el enrutado de Users
route.use("/guild", require("./users"))

module.exports = route

 