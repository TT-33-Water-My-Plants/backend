const router = require('express').Router();

const Plant = require('./plants-model');

router.get('/', (req, res) => {
    Plant.find()
        .then(plants => {
            res.json(plants);
        })
});

router.get('/:id', (req, res) => {
    Plant.findById(req.params.id)
        .then(plant => {
            res.json(plant);
        })
});

router.post('/', (req, res) => {
    Plant.add(req.body)
        .then(newPlant => {
            res.status(201).json(newPlant)
        })
});

router.put('/:id', (req, res) => {
    Plant.update(req.params.id, req.body)
        .then(updated => {
            res.json(updated);
        })
});

router.delete('/:id', (req, res) => {
    Plant.remove(req.params.id)
        .then(deleted => {
            res.json(deleted);
        })
})

module.exports = router;