const bonesRouter = require('express').Router()
const Bone = require('../models/bone')

// Finds all bones from database after GET-request and returns JSON
bonesRouter.get('/', async (request, response) => {
  const bones = await Bone.find({})
  console.log('operation returned bones ', bones)
  response.json(bones.map(Bone.format))
})

module.exports = bonesRouter