// const db = require('../../data/db-config');

const User = require('./users-model');

const checkId = async (req, res, next) => {
    const check = await User.findById(req.params.id);

    if (!check) {
        res.status(404).json({ message: `User with this ID not found.` })
    } else {
        next();
    }
}

const checkPayload = async (req, res, next) => {
    const { username, password, phoneNumber } = req.body;

    if (!username || !password || !phoneNumber) {
        res.status(401).json({ message: 'Username, Password, and Phone Number required.' })
    } else {
        next();
    }
}

module.exports = {
    checkId,
    checkPayload
}