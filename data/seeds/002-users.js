
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return  knex.raw('TRUNCATE TABLE users, plants CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Chantz', password: 'abc123', phoneNumber: '1-888-888-8888'},
        {username: 'Austin', password: 'abc123', phoneNumber: '1-888-888-8888'},
        {username: 'Paul', password: 'abc123', phoneNumber: '1-888-888-8888'}
      ]);
    });
};
