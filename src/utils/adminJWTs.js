const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getAdminTokens = async () => {
  const admins = await User.find({ role: 'ADMIN' })
  let adminTokens = []
  admins.forEach(admin => {
    const adminForToken = {
      username: admin.username,
      id: admin._id,
      role: admin.role
    }
    adminTokens.push(jwt.sign(adminForToken, process.env.SECRET))
  })
  return adminTokens
}

const getToken = async (user) => {
  const adminForToken = {
    username: user.username,
    id: user._id,
    role: user.role
  }
  return jwt.sign(adminForToken, process.env.SECRET)
}


module.exports = { getAdminTokens, getToken }
