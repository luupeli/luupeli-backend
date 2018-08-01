const gameSessionsRouter = require('express').Router()
const GameSession = require('../models/gameSession')

gameSessionsRouter.get('/', async(request, response) => {
	const gameSessions = await GameSession
		.find({})
		.populate('user')
		.populate('animals')
		.populate('bodyparts')

	response.json(gameSessions.map(GameSession.format))
})

gameSessionsRouter.get('/:id', async(request, response) => {	
	try {
		const gameSession = await GameSession
			.findById(request.params.id)
			.populate('user')
			.populate('animals')
			.populate('bodyparts')

		if (gameSession) {
			response.json(GameSession.format(gameSession))
		} else {
			response.status(404).end()
		}
	} catch (err) {
		console.log(err)
    response.status(404).send({ error: 'malformatted id' })
	}
})

gameSessionsRouter.post('/', async(request, response) => {
	try {
		const body = request.body

		const gameSession = new GameSession({
			user: body.user,
			mode: body.mode,
			length: body.length,
			difficulty: body.difficulty,
			animals: body.animals,
			bodyparts: body.bodyparts,
			correctAnswerCount: body.correctAnswerCount,
			almostCorrectAnswerCount: body.almostCorrectAnswerCount,
			startTimeStamp: Date.now(),
			endTimeStamp: Date.now()
		})

		const savedGameSession = await gameSession.save()
    response.json(GameSession.format(gameSession))
	} catch (err) {
		console.log(err)
		response.status(500).json({ error: 'something went wrong' })
	}
})

gameSessionsRouter.put('/:id', async(request, response) => {
	try {
		const body = request.body
		const oldGameSession = GameSession.findById(request.params.id)

		if (!oldGameSession) {
			response.status(404).end()
		}

		const gameSession = new GameSession({
			user: body.user,
			mode: body.mode,
			length: body.length,
			difficulty: body.difficulty,
			animals: body.animals,
			bodyparts: body.bodyparts,
			correctAnswerCount: body.correctAnswerCount,
			almostCorrectAnswerCount: body.almostCorrectAnswerCount,
			startTimeStamp: body.startTimeStamp,
			endTimeStamp: body.endTimeStamp
		})

		const updatedGameSession = await GameSession.findByIdAndUpdate(request.params.id)
		response.json(GameSession.format(updatedGameSession))

	} catch (err) {
		console.log(err)
		response.status(500).json({ error: 'something went wrong'} )
	}
})

gameSessionsRouter.delete('/:id', async(request, response) => {
	try {
		const gameSession = await GameSession.findById(request.params.id)
		await GameSession.remove(gameSession)

		response.status(204).end()
	} catch(err) {
		console.log(err)
		response.status(400).send( {error: 'malformatted id' })
	}
})

module.exports = gameSessionsRouter
