exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable();
      users.string('password', 200).notNullable();
      users.string('phoneNumber', 14).notNullable();
      users.timestamps(false, true)
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id');
      plants.string('nickname', 128).notNullable().unique();
      plants.string('species', 128).notNullable();
      plants.integer('h2oFrequency').notNullable();
      plants.string('image').defaultTo('https://image.flaticon.com/icons/png/512/128/128744.png');
      plants.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('plants');
  await knex.schema.dropTableIfExists('users');
};
