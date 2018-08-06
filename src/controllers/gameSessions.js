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
		
		if (body.animals === undefined) {
      return response.status(400).json({ error: 'animals missing' })
    } else if (body.bodyparts === undefined) {
      return response.status(400).json({ error: 'bodyparts missing' })
    } else if (body.mode === undefined) {
      return response.status(400).json({ error: 'game mode missing' })
    } else if (body.length === undefined) {
      return response.status(400).json({ error: 'game length missing' })
    } else if (body.correctAnswerCount === undefined) {
      return response.status(400).json({ error: 'count for correct answers missing' })
    } else if (body.almostCorrectAnswerCount === undefined) {
      return response.status(400).json({ error: 'count for almost correct answers missing' })
    } else if (body.seconds === undefined) {
			return response.status(400).json({ error: 'seconds missing' })
		}
		const gameSession = new GameSession({
			user: body.user,
			mode: body.mode,
			length: body.length,
			animals: body.animals,
			bodyparts: body.bodyparts,
			correctAnswerCount: body.correctAnswerCount,
			almostCorrectAnswerCount: body.almostCorrectAnswerCount,
			seconds: body.seconds,
			timeStamp: Date.now()
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
			animals: body.animals,
			bodyparts: body.bodyparts,
			correctAnswerCount: body.correctAnswerCount,
			almostCorrectAnswerCount: body.almostCorrectAnswerCount,
			seconds: body.seconds,
			timeStamp: body.timeStamp
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
