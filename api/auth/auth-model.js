const db = require('../../data/db-config');

const findBy = (filter) => {
    return db('users as u')
        .select('u.user_id', 'u.username', 'u.password', 'u.phoneNumber')
        .where(filter);
};

const findById = (id) => {
    return db('users as u')
        .select('u.user_id', 'u.username', 'u.password', 'u.phoneNumber')
        .where('u.user_id', id)
        .first();
};

const add = async (user) => {
    const id = await db('users').insert(user);
    console.log(id)
    return findById(id);
};

module.exports = {
    findBy,
    findById,
    add
};