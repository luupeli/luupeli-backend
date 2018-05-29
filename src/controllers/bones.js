const bonesRouter = require('express').Router()
const Bone = require('../models/bone')

// Finds all bones from database after GET-request and returns in JSON
bonesRouter.get('/', async (request, response) => {
  const bones = await Bone.find({})
  console.log('operation returned bones ', bones)
  response.json(bones.map(Bone.format))
})

// Finds and returns one bone in JSON
bonesRouter.get('/:id', async (request, response) => {
  try {
    const bone = await Bone.findById(request.params.id)
    if (bone) {
    response.json(Bone.format(bone))
    } else {
    response.status(404).end()
    }
  } catch (err) {
    console.log(err)
    response.status(404).send({ error: 'malformatted id' })
  }
})

// Creates a bone from given request and saves it to the database
bonesRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    const bone = new Bone({
      name: body.name,
      nameLatin: body.nameLatin,
      image: body.image
    })
    const savedBone = await bone.save()
    response.json(Bone.format(bone))
  } catch (err) {
    console.log(err)
    response.status(500).json({ error: 'something went wrong'})
  }
})

// Finds one bone by id and deletes it from database
bonesRouter.delete('/:id', async (request, response) => {
  try {
    await Bone.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (err) {
    console.log(err)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = bonesRouter