const GameSession = require('../models/gameSession')
const { initialUsers1 } = require('./user_test_helper')


const initialGameSessions = [
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'kirjoituspeli',
    length: 3,
    animals: ["5b2b8c851867cd00142634e7" ,"5b2b8c8d1867cd00142634e8"],
    bodyparts: ["5b2b8d4b1867cd00142634eb", "5b2b8d521867cd00142634ec"],
    correctAnswerCount: 1,
    almostCorrectAnswerCount: 1,
    timeStamp: "2018-06-26T21:01:31.169Z",
    seconds: 12
  },
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'monivalintapeli',
    length: 7,
    animals: ["5b2b8c851867cd00142634e9", "5b2b8c8d1867cd00142634ea"],
    bodyparts: ["5b2b8d4b1867cd00142634eb", "5b2b8d521867cd00142634ec",],
    correctAnswerCount: 4,
    almostCorrectAnswerCount: 2,
    timeStamp: "2018-06-26T21:01:31.169Z",
    seconds: 42
  },
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'viallinen update',
    length: 7,
    animals: ["5b2b8c851867cd00142634e9", "5b2b8c8d1867cd00142634ea"],
    bodyparts: ["5b2b8d4b1867cd00142634eb","5b2b8d521867cd00142634ec"],
    correctAnswerCount: 4,
    almostCorrectAnswerCount: 2,
    timeStamp: "2018-06-26T21:01:31.169Z",
    seconds: 12
  }
]

const gameSessionsToBeAdded = [
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'kimblepeli',
    length: 7,
    animals: ["5b2b8c8d1867cd00142634ea"],
    bodyparts: ["5b2b8d521867cd00142634ec"],
    correctAnswerCount: 1,
    almostCorrectAnswerCount: 5,
    timeStamp: "2018-06-26T21:01:31.169Z",
    seconds: 12
  },
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'kimblepeli',
    length: 7,
    bodyparts: ["5b2b8d521867cd00142634ec"],
    correctAnswerCount: 1,
    almostCorrectAnswerCount: 5,
    timeStamp: "2018-06-26T21:01:31.169Z",
    seconds: 12
  }
]

const formatGameSession = (gameSession) => {
  return {
    id: gameSession._id,
		user: gameSession.user,
		mode: gameSession.mode,
		difficulty: gameSession.difficulty,
		animals: gameSession.animals,
		bodyparts: gameSession.bodyparts,
		correctAnswerCount: gameSession.correctAnswerCount,
		almostCorrectAnswerCount: gameSession.almostCorrectAnswerCount,
		timeStamp: gameSession.timeStamp,
		seconds: gameSession.seconds 
  }
}

const gameSessionsInDb = async () => {
  const gameSessions = await GameSession.find({})
  return gameSessions.map(formatGameSession)
}

module.exports = {
  initialGameSessions, gameSessionsToBeAdded, formatGameSession, gameSessionsInDb
}