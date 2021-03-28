const db = require('../../data/db-config');

const User = require('./users-model');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            console.log(users);
            res.json(users);
        })
})


router.post('/', (req, res) => {
    User.add(req.body)
        .then(user => {
            res.json(user);
        })
})

module.exports = router;