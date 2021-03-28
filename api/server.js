const usersRouter = require('./users/users-router');

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', usersRouter);

server.use('/', (req, res, next) => { //eslint-disable-line
    res.json({ message: 'It\'s working!' });
})

module.exports = server
