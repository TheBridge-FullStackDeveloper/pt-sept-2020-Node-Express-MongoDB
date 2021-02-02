const express = require('express');

const router = express.Router();

// Requerimos los archivos de rutas
const userRoutes = require('./user.routes');
const tweetRoutes = require('./tweet.routes');
const authRoutes = require('./auth.routes');

// Inyectamos las rutas en el middleware router de express
router.use('/user', userRoutes);
router.use('/tweet', tweetRoutes);
router.use('/auth', authRoutes);

module.exports = router;
