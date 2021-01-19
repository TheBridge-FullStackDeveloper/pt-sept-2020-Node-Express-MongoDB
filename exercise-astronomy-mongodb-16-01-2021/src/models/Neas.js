const mongoose = require('mongoose');
const { Schema } = mongoose;

const NeasSchema = new Schema({
  designation: String,
  discoveryDate: Date,
  hMag: Number,
  moidAu: Number,
  qAu1: Number,
  qAu2: Number,
  periodYr: Number,
  iDeg: Number,
  pha: String,
  orbitClass: String,
});

const model = mongoose.model('Neas', NeasSchema);

module.exports = model;
