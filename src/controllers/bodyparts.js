const bodypartRouter = require('express').Router()
const Bodypart = require('../models/bodypart')

// Finds all body parts from database after GET-request and returns in JSON
bodypartRouter.get('/', async (request, response) => {
  const bodyparts = await Bodypart
    .find({})
  console.log('operation returned bodyparts ', bodyparts)
  response.json(bodyparts.map(Bodypart.format))
})

// Creates body parts from given request and saves it to the database
bodypartRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    const bodypart = new Bodypart({
      name: body.name
    })

    const savedBodypart = await bodypart.save()
    response.json(Bodypart.format(bodypart))
  } catch (err) {
    console.log(err)
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = bodypartRouter