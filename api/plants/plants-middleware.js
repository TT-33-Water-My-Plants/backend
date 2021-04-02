// const db = require('../../data/db-config');
const Plant = require('./plants-model');

const checkId = async (req, res, next) => {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
        res.status(404).json({ message: 'Plant with this ID not found.' })
    } else {
        next();
    }
};

const checkPayload = async (req, res, next) => {
    const { nickname, species, h2oFrequency, user_id } = req.body;

    if (!nickname || !species || !h2oFrequency || !user_id) {
        res.status(401).json({ message: 'Nickname, Species, Watering Frequency, and User ID required.' })
    } else {
        next();
    }
}

module.exports = {
    checkId,
    checkPayload
}