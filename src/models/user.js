const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: {type: String},
  passwordHash: { type: String }
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    passwordHash: user.passwordHash
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User