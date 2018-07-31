const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Animal = require('../models/animal')
const { formatAnimal, initialAnimals, animalsInDb } = require('./animal_test_helper')
const { initialUsers2 } = require('./user_test_helper')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const url = '/api/animals'

describe('when there is initially some animals saved', async () => {
	beforeAll(async () => {
		jest.setTimeout(30000)
		await Animal.remove({})
		const animalObjects = initialAnimals.map(a => new Animal(a))
		await Promise.all(animalObjects.map(a => a.save()))
		await User.remove({})
		const userObjects = initialUsers2.map(u => new User(u))
		await Promise.all(userObjects.map(u => u.save()))
	})

	test('all images are returned as JSON by GET /api/animals', async () => {
		const animalsInDatabase = await animalsInDb()
		const response = await api
			.get(url)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body.length).toBe(animalsInDatabase.length)

		const returnedAnimals = response.body.map(a => a.name)
		animalsInDatabase.forEach(animal => {
			expect(returnedAnimals).toContain(animal.name)
		})
	})

	describe('addition of a new animal', async () => {

		describe('when an admin token is sent with the request', async () => {

			test('succesfully adds valid animal by POST /api/animals', async () => {
				const admin = await User.findOne({ username: 'zizek' })
				const adminForToken = {
					username: admin.username,
					id: admin._id,
					role: admin.role
				}
				const token = jwt.sign(adminForToken, process.env.SECRET)
				
				const animalsAtStart = await animalsInDb()
				const animal = {
					name: 'Rotta'
				}
				await api
					.post(url)
					.send({ animal, token: token })
					.expect(200)
					.expect('Content-Type', /application\/json/)

				const animalsAfterPost = await animalsInDb()
				expect(animalsAfterPost.length).toBe(animalsAtStart.length + 1)
				const names = animalsAfterPost.map(a => a.name)
				expect(names).toContain('Rotta')
			})

			test('does not add an animal without a name', async () => {
				const admin = await User.findOne({ username: 'zizek' })
				const adminForToken = {
					username: admin.username,
					id: admin._id,
					role: admin.role
				}
				const token = jwt.sign(adminForToken, process.env.SECRET)
				const animals = await animalsInDb()

				const animal = {}
				await api.post(url).send({ animal, token: token }).expect(400)

				const animalsAfter = await animalsInDb()
				expect(animalsAfter.length).toBe(animals.length)
			})
		})
		describe('when an admin token is not sent with the request', async () => {

			test('Unauthorized 401', async () => {
				const animal = {
					name: 'Rotta'
				}
				await api
					.post(url)
					.send({ animal })
					.expect(401)
			})
		})
	})

	afterAll(() => {
		server.close()
	})
})

