const bestAnswersRouter = require('express').Router()
const Answer = require('../models/answer')

bestAnswersRouter.get('/', async(request, response) => {
	const answers = await Answer
		.find({})
		.populate('images')
		.populate('user', {username: 1})
	response.json(answers.map(Answer.format))
})

bestAnswersRouter.get('/:id', async(request, response) => {
	
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

bestAnswersRouter.post('/', async(request, response) => {
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

bestAnswersRouter.put('/:id', async(request, response) => {
	try {
		const body = request.body
		const oldAnswer = Answer.findById(request.params.id)

		if(!oldAnswer) {
			response.status(404).end()
		}

		const answer = new Answer({
			image: body.image,
			user: body.user,
			correctness: body.correctness,
			input: body.input,
			points: body.points,
			lastModified: Date.now(),
			creationTime: body.creationTime		
		})

		const updatedAnswer = await Answer.findByIdAndUpdate(request.params.id, answer, { new: true})
		response.json(Answer.format(updatedAnswer))
	} catch (err) {
    console.log(err)
    response.status(500).json({ error: 'something went wrong' })
  }
})

bestAnswersRouter.delete('/:id', async(request, response) => {
	try {
		const answer = await Answer.findById(request.params.id)
		await Answer.remove(answer)

		response.status(204).end()
	} catch (err) {
		console.log(err)
		response.status(400).send({ error: 'malformatted id' })
	}
})

module.exports = bestAnswersRouter