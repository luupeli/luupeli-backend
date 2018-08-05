const animalsRouter = require('express').Router()
const Animal = require('../models/animal')
const { getAdminTokens } = require('../utils/adminJWTs')

// Finds all animals from database after GET-request and returns in JSON
animalsRouter.get('/', async (request, response) => {
  const animals = await Animal
    .find({})
  console.log('operation returned animals ', animals)
  response.json(animals.map(Animal.format))
})

// Creates an animal from given request and saves it to the database
animalsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const adminTokens = await getAdminTokens()
    if (adminTokens.includes(body.token) === false) {
      return response.status(401).json({ error: 'unauthorized' })
    } else if (body.animal.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    const animal = new Animal({
      name: body.animal.name
    })

    const savedAnimal = await animal.save()
    response.json(Animal.format(animal))
  } catch (err) {
    console.log(err)
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = animalsRouter