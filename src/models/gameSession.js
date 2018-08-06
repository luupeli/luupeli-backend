mongoose = require('mongoose')

const gameSessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    mode: String,
    length: Number,
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }],
    bodyparts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bodyPart' }],
    correctAnswerCount: Number,
    almostCorrectAnswerCount: Number,
    totalScore: Number,
    seconds: Number,
    timeStamp: { type: Date }
})

gameSessionSchema.statics.format = (gameSession) => {
	return {
		id: gameSession._id,
		user: gameSession.user,
		mode: gameSession.mode,
		length: gameSession.length,
		animals: gameSession.animals,
		bodyparts: gameSession.bodyparts,
		correctAnswerCount: gameSession.correctAnswerCount,
		almostCorrectAnswerCount: gameSession.almostCorrectAnswerCount,
		seconds: gameSession.seconds,
		timeStamp: gameSession.timeStamp
	}
}

const GameSession = mongoose.model("gameSession", gameSessionSchema)

module.exports = GameSession