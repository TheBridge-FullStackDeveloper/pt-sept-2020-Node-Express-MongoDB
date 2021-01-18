const mongoose = require('mongoose')
const { Schema } = mongoose

const BookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  creation: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true,
    required: true
  },
  editions: {
    type: Number
  },
  year: {
    type: Number
  },
  sales: {
    type: Number
  },
  publisher: {
    type: String
  }
})

const Books = mongoose.model('Books', BookSchema)

module.exports = Books