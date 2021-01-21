const mongoose = require('mongoose');

// 1. Creo el esquema del modelo
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 2. Creo el modelo y lo exporto
const User = mongoose.model('User', userSchema);
module.exports = User;
