const GameSession = require('../models/gameSession')
const { initialUsers1 } = require('./user_test_helper')


const initialGameSessions = [
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'kirjoituspeli',
    length: 3,
    difficulty: 'normaali',
    animals: ["5b2b8c851867cd00142634e7" ,"5b2b8c8d1867cd00142634e8"],
    bodyParts: [
      {
        id: "5b2b8d4b1867cd00142634eb"
        },
      {
        id: "5b2b8d521867cd00142634ec"
      }
    ],
    correctAnswerCount: 1,
    almostCorrectAnswerCount: 1,
    startTimeStamp: "2018-06-26T21:01:31.169Z",
    endTimeStamp: "2018-06-26T21:01:34.169Z"
  },
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'monivalintapeli',
    length: 7,
    difficulty: 'normaali',
    animals: ["5b2b8c851867cd00142634e9", "5b2b8c8d1867cd00142634ea"],
    bodyParts: [
      {
        id: "5b2b8d4b1867cd00142634eb",
        },
      {
        id: "5b2b8d521867cd00142634ec",
      }
    ],
    correctAnswerCount: 4,
    almostCorrectAnswerCount: 2,
    startTimeStamp: "2018-06-26T21:01:31.169Z",
    endTimeStamp: "2018-06-26T21:01:34.169Z"
  },
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'viallinen update',
    length: 7,
    difficulty: 'normaali',
    animals: ["5b2b8c851867cd00142634e9", "5b2b8c8d1867cd00142634ea"],
    bodyParts: [
      {
        id: "5b2b8d4b1867cd00142634eb",
        },
      {
        id: "5b2b8d521867cd00142634ec",
      }
    ],
    correctAnswerCount: 4,
    almostCorrectAnswerCount: 2,
    startTimeStamp: "2018-06-26T21:01:31.169Z",
    endTimeStamp: "2018-06-26T21:01:34.169Z"
  }
]

const gameSessionsToBeAdded = [
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'kimblepeli',
    length: 7,
    difficulty: 'normaali',
    animals: ["5b2b8c8d1867cd00142634ea"],
    bodyParts: [
      {
        id: "5b2b8d521867cd00142634ec",
      }
    ],
    correctAnswerCount: 1,
    almostCorrectAnswerCount: 5,
    startTimeStamp: "2018-06-26T21:01:39.169Z",
    endTimeStamp: "2018-06-26T21:01:42.169Z"
  },
  {
    user: '5b2b8c851867cd00142634e7',
    mode: 'kimblepeli',
    length: 7,
    difficulty: 'normaali',
    bodyParts: [
      {
        id: "5b2b8d521867cd00142634ec",
      }
    ],
    correctAnswerCount: 1,
    almostCorrectAnswerCount: 5,
    startTimeStamp: "2018-06-26T21:01:39.169Z",
    endTimeStamp: "2018-06-26T21:01:42.169Z"
  }
]

const formatGameSession = (gameSession) => {
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

const gameSessionsInDb = async () => {
  const gameSessions = await GameSession.find({})
  return gameSessions.map(formatGameSession)
}

module.exports = {
  initialGameSessions, gameSessionsToBeAdded, formatGameSession, gameSessionsInDb
}