const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

mongoose
  .connect(config.dbUrl)
  .then( () => {
    console.log('connected to database', config.dbUrl)
  })
  .catch( err => {
    console.log(err)
  })

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)
app.use('/api/bones', require('./controllers/bones').bonesRouter)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}