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
    return await db('users').insert(user, ['user_id', 'username', 'password', 'phoneNumber']);
};

module.exports = {
    findBy,
    findById,
    add
};