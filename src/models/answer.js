mongoose = require('mongoose')

//database schema for answer and bestAnswer
const answerSchema = new mongoose.Schema({
	image: { type: mongoose.Schema.Types.ObjectId, ref: 'image' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	correctness: Number,
	input: String,
	points: Number,
	time: Number,
	gamemode: String,
	lastModified: { type: Date },
	creationTime: { type: Date }
})

// Formats answer from the database to be used in the app
answerSchema.statics.format = (answer) => {
	return {
		id: answer._id,
		image: answer.image,
		user: answer.user,
		correctness: answer.correctness,
		input: answer.input,
		points: answer.points,
		lastModified: answerSchema.lastModified,
		creationTime: answer.creationTime
	}
}

const Answer = mongoose.model("answer", answerSchema)

module.exports = Answer