const answersRouter = require('express').Router()
const Answer = require('../models/answer')

answersRouter.get('/', async(request, response) => {
	const answers = await Answer
		.find({})
		.populate('images')
		.populate('user', {username: 1})

	response.json(answers.map(Answer.format))
})

answersRouter.get('/:id', async(request, response) => {	
	try {
		const answer = await Answer
			.findById(request.params.id)
			.populate('images')
			.populate('user', {username: 1})

		if (answer) {
			response.json(Answer.format(answer))
		} else {
			response.status(404).end()
		}
	} catch (err) {
		console.log(err)
    response.status(404).send({ error: 'malformatted id' })
	}
})

answersRouter.get('/user/:userId/img/:imgId', async(request, response) => {
	try {
		const answers = await Answer
			.find({'user': request.params.userId, 'image': request.params.imgId})
			
			if (answers) {
			response.json(answers.map(Answer.format))
		} else {
			console.log(err)
			response.status(404).send({ error: 'malformatted id' })
		}
	} catch (err) {
		console.log(err)
		response.status(404).send({ error: 'malformatted id' })
	}
})

answersRouter.get('/user/:userId', async(request, response) => {
	try {
		const answers = await Answer
			.find({'user': request.params.userId})
			.populate('images')
			
			if (answers) {
			response.json(answers.map(Answer.format))
		} else {
			console.log(err)
			response.status(404).send({ error: 'malformatted id' })
		}
	} catch (err) {
		console.log(err)
		response.status(404).send({ error: 'malformatted id' })
	}
})

answersRouter.post('/', async(request, response) => {
	try {
		const body = request.body
		
    const answer = new Answer({
			image: body.image,
			user: body.user,
			correctness: body.correctness,
			input: body.input,
			points: body.points,
			lastModified: Date.now(),
			creationTime: Date.now()		
    })

    const savedAnswer = await answer.save()
    response.json(Answer.format(answer))
  } catch (err) {
    console.log(err)
    response.status(500).json({ error: 'something went wrong' })
  }
})

answersRouter.delete('/:id', async(request, response) => {
	try {
		const answer = await Answer.findById(request.params.id)
		await Answer.remove(answer)
		
		response.status(204).end()
	} catch (err) {
		console.log(err)
		response.status(400).send({ error: 'malformatted id' })
	}
})

module.exports = answersRouter
