const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

const Auth = require('./auth-model');

const validatePayload = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).json({ message: 'Username, Password, and Phone Number required.' })
    } else if (password.length < 6) {
        res.status(401).json({ message: 'Password must be 6 chars or longer.' })
    } else {
        next();
    }
};

const validatePhone = (req, res, next) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        res.status(401).json( { message: 'Phone Number Required' });
    } else {
        next();
    }
}

//? Add phone number validation if time allows.

const validateUsernameUnique = async (req, res, next) => {
    const { username } = req.body;

    Auth.findBy({ username: username })
        .then(check => {
            if (!check.length) {
                next();
            } else {
                res.status(401).json({ message: 'Username already exists.' })
            }
        })
}

const validateUserExists = async (req, res, next) => {
    const { username } = req.body;

    Auth.findBy({ username: username })
        .then(check => {
            if (check.length) {
                req.user = check[0];
                next();
            } else {
                res.status(401).json({ message: 'Invalid credentials.' })
            }
        });
};

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: 'Authorization required - please login.' })
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token - please log back in.' })
            } else {
                res.decodedToken = decoded;
                next();
            }
        })
    }
}

const buildToken = (user) => {
    const payload = {
        subject: user.user_id,
        username: user.username,
        password: user.password,
        phoneNumber: user.phoneNumber
    };

    const options = {
        expiresIn: '6h'
    };

    return jwt.sign(payload, JWT_SECRET, options);
}


module.exports = {
    validatePayload,
    validatePhone,
    validateUsernameUnique,
    validateUserExists,
    restricted,
    buildToken
}