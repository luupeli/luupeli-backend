const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(formatUser)
}

const initialUsers = [
  {
    username: 'luidenharrastelija',
    password: 'salasana'
  },
  {
    username: 'bonelover',
    password: 'password'
  },
  {
    username: 'humerus',
    password: 'olkaluu'
  }
]

const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    // passwordHash: user.passwordHash
  }
}

module.exports = { usersInDb, initialUsers, formatUser }