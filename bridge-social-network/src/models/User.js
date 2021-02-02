const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 2, trim: true, maxlength: 15 },
    alias: { type: String, required: true, minlength: 1, trim: true, maxlength: 8, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // Una mejora es añadir una regexp de validación
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
    },
    password: { type: String, required: true },
    bio: { type: String, maxlength: 140, trim: true },
    isPrivate: { type: Boolean, default: false },
    tweets: [{ type: mongoose.Types.ObjectId, ref: 'Tweet' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    follows: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    blocked: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      // doc es el elemento que saco de la DB
      // ret es el elemento que devuelvo al user
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

// Un virtual de modelos tiene más sentido entre relaciones 1:n
// Es decir, UN usuario tiene N tweets con un campo author que apunta a la _id del usuario
userSchema.virtual('myTweets', {
  ref: 'Tweet',
  localField: '_id',
  foreignField: 'author',
});

const User = mongoose.model('User', userSchema);
module.exports = User;
