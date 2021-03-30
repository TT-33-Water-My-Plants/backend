const db = require('../../data/db-config');

const find = () => {
    return db('plants').select('plant_id', 'nickname', 'species', 'h2oFrequency', 'image');
};

const findById = (id) => {
    return db('plants').where('plant_id', id).select('nickname', 'species', 'h2oFrequency', 'image').first();
};

const add = async (plant) => {
    return await db('plants').insert(plant, ['nickname', 'species', 'h2oFrequency', 'image']);
}

const update = async (id, changes) => {
    return await db('plants').where('plant_id', id).update(changes, ['nickname', 'species', 'h2oFrequency', 'image']);
}

const remove = async (id) => {
    const deleted = await findById(id);
    await db('plants').where('plant_id', id).del();
    return deleted;
}

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}