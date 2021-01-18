const mongoose = require('mongoose')
const { Schema } = mongoose

const NeasSchema = new Schema({
  designation: String,
  discovery_date: Date,
  h_mag: Number,
  moid_au: Number,
  q_au_1: Number,
  q_au_2: Number,
  period_yr: Number,
  i_deg: Number,
  pha: String,
  orbit_class: String
})

const model = mongoose.model('Neas', NeasSchema)

module.exports = model