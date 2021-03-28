const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { HASH_ROUNDS } = require('../secrets');

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

router.post('/register', validatePayload, validatePhone, validateUsernameUnique, (req, res) => {
    const { password } = req.body;

    const hash = bcrypt.hashSync(password, 7);

    req.body.password = hash;

    Auth.add(req.body)
        .then(registered => {
            res.status(201).json(registered);
        })
})

router.post('/login', validatePayload, validateUserExists, (req, res) => {
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
})

module.exports = router;