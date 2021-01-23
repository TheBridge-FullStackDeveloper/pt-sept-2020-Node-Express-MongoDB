const route = require('express').Router();

const characterRoutes = require('./characters');

// Middleware para el enrutado de Landings

// Middleware para el enrutado de los NEAs

// Middleware para el enrutado de Users

// Middleware para el enrutado de Characters
route.use('/character', characterRoutes);

module.exports = route;
