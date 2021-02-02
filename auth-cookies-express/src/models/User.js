const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String }
  },
  {
    timestamps: true,
    // Deletes the password and googleId when converting to JSON so it never reaches the frontend
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.googleId
      }
    }
  }
)

const User = model('User', userSchema)
module.exports = User
