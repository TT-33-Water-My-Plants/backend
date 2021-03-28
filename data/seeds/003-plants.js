
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return  knex.raw('TRUNCATE TABLE users, plants CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {nickname: 'Cardinal Basil', species: 'Ocimum basicicum \'cardinal\'', h2oFrequency: 0, user_id: 1, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/b/a/basil-cardinal-lss-dsc_6888.jpg'},
        {nickname: 'White Stars Feverfew', species: 'Tanacetum parthenium', h2oFrequency: 0, user_id: 2, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/f/e/feverfew-white-stars-lss-dsc_6136_1.jpg'},
        {nickname: 'Chinese Lantern Gigantea', species: 'Physalis franchetii', h2oFrequency: 0, user_id: 3, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/G/a/Garden-Berries-Chinese-Lantern-IMG_0701-lantern-fl-lit.jpg'}
      ]);
    });
};