const route = require('express').Router();

const landingRoutes = require('./landings');
const userRoutes = require('./users');

// Middleware para el enrutado de Landings
route.use('/landings', landingRoutes);

// Middleware para el enrutado de los NEAs

// Middleware para el enrutado de Users
route.use('/users', userRoutes);

module.exports = route;
