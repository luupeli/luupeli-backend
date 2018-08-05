const bodyPartRouter = require('express').Router()
const BodyPart = require('../models/bodyPart')
const { getAdminTokens } = require('../utils/adminJWTs')

// Finds all body parts from database after GET-request and returns in JSON
bodyPartRouter.get('/', async (request, response) => {
  const bodyParts = await BodyPart
    .find({})
  console.log('operation returned bodyParts ', bodyParts)
  response.json(bodyParts.map(BodyPart.format))
})

// Creates body parts from given request and saves it to the database
bodyPartRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const adminTokens = await getAdminTokens()
    if (adminTokens.includes(body.token) === false) {
      return response.status(401).json({ error: 'unauthorized' })
    } else if (body.bodypart.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    const bodyPart = new BodyPart({
      name: body.bodypart.name
    })

    const savedBodyPart = await bodyPart.save()
    response.json(BodyPart.format(bodyPart))
  } catch (err) {
    console.log(err)
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = bodyPartRouter