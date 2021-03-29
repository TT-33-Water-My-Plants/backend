const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { HASH_ROUNDS } = require('../secrets'); // eslint-disable-line

const Auth = require('./auth-model');

const {
    validatePayload,
    validatePhone,
    validateUsernameUnique,
    validateUserExists,
    buildToken
} = require('./auth-middleware');

/*======
REGISTER
=======*/

router.post('/register', validatePayload, validatePhone, validateUsernameUnique, (req, res, next) => {
    const { password } = req.body;

    const hash = bcrypt.hashSync(password, 7);

    req.body.password = hash;

    Auth.add(req.body)
        .then(registered => {
            res.status(201).json(registered);
        })
        .catch(next);
})

router.post('/login', validatePayload, validateUserExists, (req, res, next) => {
    const { username, password } = req.body;

    Auth.findBy({ username: username })
    .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = buildToken(user);

                res.json({
                    message: `Welcome, ${user.username}!`,
                    token: token,
                    data: user
                })
            }
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: 'Server error: something went wrong.'
    })

    next();
})

module.exports = router;