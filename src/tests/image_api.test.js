const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Image = require('../models/image')
const { formatImage, initialImages, imagesInDb, nonExistingImageId } = require('./image_test_helper')

const url = '/api/images'

describe('when there is initially some images saved', async () => {
  beforeAll(async () => {
    await Image.remove({})
    const imageObjects = initialImages.map(i => new Image(i))
    await Promise.all(imageObjects.map(i => i.save()))
  })

  test('all images are returned as JSON by GET /api/images', async () => {
    const imagesInDatabase = await imagesInDb()
    const response = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(imagesInDatabase.length)

    const returnedImages = response.body.map(i => i.url)
    imagesInDatabase.forEach(image => {
      expect(returnedImages).toContain(image.url)
    })
  })

  test('individual images are returned as JSON by GET /api/images/:id', async () => {
    const imagesInDatabase = await imagesInDb()
    const anImage = imagesInDatabase[0]

    const response = await api
      .get(url+'/'+anImage.id)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('404 statuscode is returned when GET /api/bones/:id is done with nonexistent valid id', async () => {
    const validNonexistingId = await nonExistingImageId()

    const response = await api
      .get(url+'/'+validNonexistingId)
      .expect(404)
  })

  test('404 statuscode is returned when GET /api/images/:id is done with invalid id', async () => {
    const invalidId = '7h31m4g3154l13'

    const response = await api
      .get(url+'/'+invalidId)
      .expect(404)
  })

  // describe('addition of a new image', async () => {

  //   test('succesfully adds valid image by POST /api/images', async () => {

  //   })
  // lisättävä myös epäonnistuva lisäys, update ja delete
  // })

  afterAll(() => {
    server.close()
  })
})