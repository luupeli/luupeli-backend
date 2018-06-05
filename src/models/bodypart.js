const mongoose = require('mongoose')

// Database schema for body part
const bodypartSchema = new mongoose.Schema({
  name: String
})

// Formats bone from the database to be used in the app
bodypartSchema.statics.format = (bodypart) => {
  return {
    id: bodypart._id,
    name: bodypart.name
  }
}

const Bodypart = mongoose.model('bodypart', bodypartSchema)

module.exports = Bodypart