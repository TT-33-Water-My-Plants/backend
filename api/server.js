const usersRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');
const authRouter = require('./auth/auth-router');

// const { restricted } = require('../api/auth/auth-middleware');

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors({ origin: 'http://localhost:3000' }));

server.use('/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter);

server.use('/', (req, res) => {
    res.json({ message: 'It\'s working!' });
})

module.exports = server
