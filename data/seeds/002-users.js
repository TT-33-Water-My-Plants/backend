
exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'Chantz', password: 'abc123', phoneNumber: '1-888-888-8888'},
        {username: 'Austin', password: 'abc123', phoneNumber: '1-888-888-8888'},
        {username: 'Paul', password: 'abc123', phoneNumber: '1-888-888-8888'}
      ]);
};
