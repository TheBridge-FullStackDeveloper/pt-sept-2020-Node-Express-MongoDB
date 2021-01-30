const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    textContent: { type: String, required: true, maxlength: 140, trim: true },
    // Los likes debería nser un array con ids de users que han dado like
    likes: { type: Number, default: 0 },
    answers: [{ type: String, maxlength: 140, trim: true }],
    // El campo _id, a pesar de ser un string, se debe indicar de tipo ObjectId y con referencia a su modelo original
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
