const db = require('../../data/db-config');

const User = require('./users-model');

const express = require('express');
const { json } = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            console.log(users);
            res.json(users);
        })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
})

router.post('/', (req, res) => {
    User.add(req.body)
        .then(user => {
            res.status(201).json(user);
        })
})

router.put('/:id', (req, res) => {
    User.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated);
        })
})

router.delete('/:id', (req, res) => {
    User.remove(req.params.id)
        .then(deleted => {
            res.json(deleted);
        })
})

module.exports = router;