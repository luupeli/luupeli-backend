mongoose = require('mongoose')

const gameSessionSchema = new mongoose.Schema({
    mode: String,
    length: Number,
    difficulty: String,
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }],
    bodyparts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bodyPart' }],
    correctAnswerCount: Number,
    almostCorrectAnswerCount: Number,
    totalScore: Number,
    startTimeStamp: { type: Date },
    endTimeStamp: { type: Date }
})

gameSessionSchema.statics.format = (gameSession) => {
	return {
		id: gameSession._id,
		user: gameSession.user,
		mode: gameSession.mode,
		length: gameSession.length,
		difficulty: gameSession.difficulty,
		animals: gameSession.animals,
		bodyparts: gameSession.bodyparts,
		correctAnswerCount: gameSession.correctAnswerCount,
		almostCorrectAnswerCount: gameSession.almostCorrectAnswerCount,
		startTimeStamp: gameSession.startTimeStamp,
		endTimeStamp: gameSession.endTimeStamp
	}
}

const GameSession = mongoose.model("gameSession", gameSessionSchema)

module.exports = GameSession