const mongoose = require('mongoose')
const { Schema } = mongoose

const LandingsSchema = new Schema({
  name: String,
  id: String,
  nametype: String,
  recclass: String,
  mass: Number,
  fall: String,
  year: Date,
  reclat: String,
  reclong: String,
  geolocation: {
    latitude: String,
    longitude: String
  }
})

const model = mongoose.model('Landings', LandingsSchema)

module.exports = model