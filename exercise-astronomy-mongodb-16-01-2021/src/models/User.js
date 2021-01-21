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
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin', 'superadmin'],
  },
});

// 2. Creo el modelo y lo exporto
const User = mongoose.model('User', userSchema);
module.exports = User;
