const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const BodyPart = require('../models/bodyPart')
const { initialBodyParts, formatBodyPart, bodyPartsInDb } = require('./body_part_test_helper')

const url = '/api/bodyparts'

describe('when there are initially some body parts saved', async () => {

	beforeAll(async () => {
		await BodyPart.remove({})
		const parts = initialBodyParts.map(bp => new BodyPart(bp))
		await Promise.all(parts.map(bp => bp.save()))
	})

	test('all parts are returned as JSON by GET /api/parts', async () => {
		const partsInDatabase = await bodyPartsInDb()
		const res = await api
			.get(url)
			.expect('Content-Type', /application\/json/)

		expect(res.body.length).toBe(partsInDatabase.length)
	})

	describe('fetching body parts', async () => {

		test('200 statuscode is returned when fetching body parts from /api/bodyparts', async () => {
			const parts = await bodyPartsInDb()
			const res = await api.get(url).expect(200)
		})

		test('names match', async () => {
			const parts = await bodyPartsInDb()
			const res = await api.get(url)

			const returnedParts = res.body.map(bp => bp.name)
			parts.forEach(part => {
				expect(returnedParts).toContain(part.name)
			})
		})

		test('ids match', async () => {
			const parts = await bodyPartsInDb()
			const res = await api.get(url)

			const returnedParts = res.body.map(bp => bp._id)
			parts.forEach(part => {
				expect(returnedParts).toContain(part._id)
			})
		})
	})

	afterAll(() => {
		server.close()
	})

})