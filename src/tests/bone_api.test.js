const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Bone = require('../models/bone')
const { format, initialBones, bonesInDb } = require('./test_helper')

const url = '/api/bones'
 
describe('when there is initially some bones saved', async () => {
  beforeAll(async () => {
    await Bone.remove({})
    const boneObjects = initialBones.map(b => new Bone(b))
    await Promise.all(boneObjects.map(b => b.save()))
  })

  test('all bones are returned as JSON by GET /api/bones', async () => {
    const bonesInDatabase = await bonesInDb()
    const response = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(bonesInDatabase.length)

    const returnedBones = response.body.map(b => b.name)
    bonesInDatabase.forEach(bone => {
      expect(returnedBones).toContain(bone.name)
    })
  })

  test('individual bones are returned as JSON by GET /api/bones/:id', async () => {
    const bonesInDatabase = await bonesInDb()
    const aBone = bonesInDatabase[0]

    const response = await api
      .get(`/api/bones/${aBone.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toBe(aBone.name)
  })

  test('a valid bone can be added', async () => {
    const newBone = {
      name: 'lisättävä luu',
      nameLatin: 'Lisattavus luumus',
      image: 'more_bones.avi'
    }

    await api
      .post(url)
      .send(newBone)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get(url)

    const names = response.body.map(b => b.name)

    expect(response.body.length).toBe(initialBones.length + 1)
    expect(names).toContain('lisättävä luu')
  })

  test('a bone without name is not added', async () => {
    const newBone = {
    }

    const initialBones = await api
      .get(url)
    await api
      .post(url)
      .send(newBone)
      .expect(400)

    const response = await api
      .get(url)
  
    expect(response.body.length).toBe(initialBones.body.length)
  })

  // Closes server after tests
  afterAll(() => {
    server.close()
  })
  
})