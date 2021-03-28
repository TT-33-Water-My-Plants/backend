const db = require('../../data/db-config');

const find = () => {
    return db('users').select('username')
}

const add = async (user) => {
    return await db('users').insert(user)
}

module.exports = {
    find,
    add
}