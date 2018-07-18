const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: {type: String},
  passwordHash: { type: String },
  role: String
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role
    
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User