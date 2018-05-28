const mongoose = require('mongoose')

const boneSchema = new mongoose.Schema({

})

boneSchema.statics.format = (bone) => {
  return {
    name: String,
    nameLatin: String,
    image: String
  }
}

const Bone = mongoose.model('Bone', boneSchema)

module.exports = Bone