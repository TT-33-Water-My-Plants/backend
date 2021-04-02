const router = require('express').Router();
const { checkId, checkPayload } = require('./plants-middleware');
const Plant = require('./plants-model');

// router.use(function(req, res, next) {
//     res.header("X-Access-Control-Allow-Origin", "*");
//     res.header("X-Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

router.get('/', (req, res, next) => {
    Plant.find()
        .then(plants => {
            res.json(plants);
        })
        .catch(next)
});

router.get('/:id', checkId, (req, res, next) => {
    Plant.findById(req.params.id)
        .then(plant => {
            res.json(plant);
        })
        .catch(next)
});

router.post('/', checkPayload, (req, res, next) => {
    Plant.add(req.body)
        .then(newPlant => {
            res.status(201).json(newPlant)
        })
        .catch(next)
});

router.put('/:id', checkId, (req, res, next) => {
    Plant.update(req.params.id, req.body)
        .then(updated => {
            res.json(updated);
        })
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    Plant.remove(req.params.id)
        .then(deleted => {
            res.json(deleted);
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: 'Server error: something went wrong.'
    })
})

module.exports = router;