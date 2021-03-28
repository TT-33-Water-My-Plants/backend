const db = require('../../data/db-config');

const find = () => {
    return db('users').select('user_id', 'username', 'phoneNumber');
};

const findById = (id) => {
    return db('users')
        .where('user_id', id)
        .select('user_id', 'username', 'phoneNumber')
        .first();
};

const add = async (user) => {
    return await db('users').insert(user, ['username', 'phoneNumber']);
};

const update = async (id, changes) => {
    return await db('users').where('user_id', id).update(changes, ['username', 'phoneNumber']);
}

const remove = async (id) => {
    return await db('users').where('user_id', id).del();
}

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}