const mongoose = require('mongoose')

// Database schema for bone
const boneSchema = new mongoose.Schema({
  name: String,
  nameLatin: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'image' }],
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'animal' },
  bodypart: { type: mongoose.Schema.Types.ObjectId, ref: 'bodypart' }
})

// Formats bone from the database to be used in the app
boneSchema.statics.format = (bone) => {
  return {
    id: bone._id,
    name: bone.name,
    nameLatin: bone.nameLatin,
    images: bone.images,
    //delete animal
    animal: bone.animal,
    bodypart: bone.bodypart
  }
}

const Bone = mongoose.model('bone', boneSchema)

module.exports = Bone