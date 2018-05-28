const mongoose = require('mongoose')

// Database schema for bone
const boneSchema = new mongoose.Schema({
  name: String,
  nameLatin: String,
  image: String
})

// Formats bone from the database to be used in the app
boneSchema.statics.format = (bone) => {
  return {
    id: bone._id,
    name: bone.name,
    nameLatin: bone.nameLatin,
    image: bone.image
  }
}

const Bone = mongoose.model('Bone', boneSchema)

module.exports = Bone