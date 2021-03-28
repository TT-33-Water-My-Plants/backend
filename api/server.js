const usersRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter);

server.use('/', (req, res, next) => { //eslint-disable-line
    res.json({ message: 'It\'s working!' });
})

module.exports = server
