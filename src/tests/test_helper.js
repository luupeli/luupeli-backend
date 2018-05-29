const Bone = require('../models/bone')

// Test bones to populate the test database
const initialBones = [
  {
    name: 'ensimmäinen luu',
    nameLatin: 'ensimmanus luumus',
    image: 'luu.jpg'
  },
  {
    name: 'toinen luu',
    nameLatin: 'tonus luumus',
    image: 'luu2.gif'
  },
  {
    name: 'kolmas luu',
    nameLatin: 'kolmus luumus',
    image: 'luu3.mp3'
  }
]

const format = (bone) => {
  return {
    name: bone.name,
    nameLatin: bone.nameLatin,
    image: bone.image,
    id: bone._id
  }
}

const nonExistingId = async () => {
  const bone = new Bone()
  await bone.save()
  await bone.remove()
  return bone._id.toString()
}

const bonesInDb = async () => {
  const bones = await Bone.find({})
  return bones.map(format)
}

module.exports = {
  initialBones, format, bonesInDb
}