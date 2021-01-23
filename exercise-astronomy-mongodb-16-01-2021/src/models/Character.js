const mongoose = require('mongoose');

const DEFAULT_FEATS = require('../constants/feats');

const characterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  lvl: {
    type: Number,
    default: 1,
  },
  birthdate: {
    type: Date,
  },
  feats: [
    {
      title: String,
      points: Number,
      achieved: Boolean,
    },
  ],
});

// Esta function no debe ser flecha para no perder el scope del modelo
characterSchema.pre('save', function (next) {
  this.feats = DEFAULT_FEATS;
  next();
});

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
