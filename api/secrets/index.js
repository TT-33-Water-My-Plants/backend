module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'supercerealsecret',
    HASH_ROUNDS: process.env.HASH_ROUNDS || 8
}