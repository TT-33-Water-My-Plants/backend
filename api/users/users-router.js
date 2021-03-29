const User = require('./users-model');

const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    User.add(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    User.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    User.remove(req.params.id)
        .then(deleted => {
            res.json(deleted);
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