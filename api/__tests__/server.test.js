const request = require('supertest'); //eslint-disable-line
const server = require('../server'); //eslint-disable-line
const db = require('../../data/db-config');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
// beforeEach(async () => {
//   await db.seed.run()
// })
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

/*=================
auth/register Tests
==================*/

describe('[POST] api/auth/register', () => {
  it('correctly registers a user to DB', async () => {
    const user = { username: 'Bob', password: 'twinpeaks', phoneNumber: '1-888-888-8888' };

    const response = await request(server).post('/auth/register').send(user);

    const expected = { user_id: 1, username: 'Bob' };

    expect(response.body[0]).toMatchObject(expected);

    expect(response.status).toBe(201);
  });

  it('registers the user with a bcrypted password', async () => {
    const user2 = { username: 'AgentCooper', password: 'twinpeaks', phoneNumber: '1-888-888-8888' };

    const response = await request(server).post('/auth/register').send(user2);

    expect(bcrypt.compareSync(user2.password, response.body[0].password)).toBeTruthy();
  })
})

/*=================
  auth/login Tests
==================*/

describe('[POST] /auth/login', () => {
  it('responds correctly to missing user info', async () => {
    const response = await request(server).post('/auth/login').send({ username: 'AgentCooper' });

    const response2 = await request(server).post('/auth/login').send({ password: 'twinpeaks' });

    expect(response.body.message).toEqual('Username, Password, and Phone Number required.');

    expect(response2.body.message).toEqual('Username, Password, and Phone Number required.');
  })

  it('allows user to login with proper creds', async () => {
    const response = await request(server).post('/auth/login').send({ username: 'AgentCooper', password: 'twinpeaks' });

    expect(response.body.message).toEqual('Welcome, AgentCooper!');
  })
})

/*==============
api/users Tests
===============*/

describe('/api/users', () => {
  describe('[GET]', () => {
    it('receives users in proper format', async () => {
      const response = await request(server).get('/api/users');

      expect(typeof response.body[0]).toBe('object');
    })

    it('can receive all users', async () => {
      const response = await request(server).get('/api/users');

      expect(response.body).toHaveLength(2);
    })
  })

  describe('[GET] /api/users/:id', () => {
    it('can receive user by id', async () => {
      const response = await request(server).get('/api/users/1');

      expect(response.body.username).toBe('Bob');
    })

    it('returns proper error if user with ID not in DB', async () => {
      const response = await request(server).get('/api/users/7');

      expect(response.body.message).toEqual('User with this ID not found.');
    })
  })

  describe('[POST]', () => {
    it('can post a new user', async () => {
      const user = { username: 'NewUser', password: 'abc123', phoneNumber: '1-888-888-8888' };

      const expected = { user_id: 3, username: 'NewUser', password: 'abc123', phoneNumber: '1-888-888-8888' };

      await request(server).post('/api/users').send(user);

      db('users').where('username', user.username).first()
        .then(newUser => {
          expect(newUser).toMatchObject(expected);
        })
    })

    it('responds with correct error if req missing data', async () => {
      const response = await request(server).post('/api/users').send({ username: 'Joe', password: 'abc123' });

      expect(response.body.message).toEqual('Username, Password, and Phone Number required.');

      expect(response.status).toBe(401);
    })
  })

  describe('[PUT]', () => {
    it('can update user by id', async () => {
      const response = await request(server).put('/api/users/2').send({ username: 'Coopz' });

      expect(response.body[0].username).toBe('Coopz');
    })

    it('responds with proper error for invalid ID', async () => {
      const response = await request(server).put('/api/users/7').send({ username: 'Foo' });

      expect(response.body.message).toEqual('User with this ID not found.');
    })
  })

  describe('[DELETE]', () => {
    it('can delete a user by ID', async () => {
      const response = await request(server).delete('/api/users/3');

      const users = await request(server).get('/api/users');

      expect(response.body).toBe(1);
      expect(users.body.length).toBe(2);
    })

    it('receives proper error for invalid ID', async () => {
      const response = await request(server).delete('/api/users/7');

      expect(response.body.message).toEqual('User with this ID not found.');
    })
  })
})

/*==============
api/plants Tests
===============*/

describe('/api/plants', () => {
  describe('[GET]', () => {
    it('can receive all plants', async () => {
      const plant = {nickname: 'Cardinal Basil', species: 'Ocimum basicicum \'cardinal\'', h2oFrequency: 0, user_id: 1, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/b/a/basil-cardinal-lss-dsc_6888.jpg'};
  
      const plant2 = {nickname: 'White Stars Feverfew', species: 'Tanacetum parthenium', h2oFrequency: 0, user_id: 2, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/f/e/feverfew-white-stars-lss-dsc_6136_1.jpg'};

      await db('plants').insert(plant);
      await db('plants').insert(plant2);

      const response = await request(server).get('/api/plants');

      expect(response.body).toHaveLength(2);
    })

    it('receives plants in proper format', async () => {
      const response = await request(server).get('/api/plants');

      expect(typeof response.body[0]).toBe('object');
    })

  })

  describe('[GET] /api/plants/:id', () => {
    it('can receive user by id', async () => {
      const response = await request(server).get('/api/plants/1');

      expect(response.body).toMatchObject({ nickname: 'Cardinal Basil' });
    })

    it('responds with the proper error for invalid ID', async () => {
      const response = await request(server).get('/api/plants/8');

      expect(response.body.message).toEqual('Plant with this ID not found.')
    })
  })

  describe('[POST]', () => {
    it('can post a new plant', async () => {
      const plant = {nickname: 'Chinese Lantern Gigantea', species: 'Physalis franchetii', h2oFrequency: 0, user_id: 3, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/G/a/Garden-Berries-Chinese-Lantern-IMG_0701-lantern-fl-lit.jpg'};

      const expected = {plant_id: 3, nickname: 'Chinese Lantern Gigantea', species: 'Physalis franchetii', h2oFrequency: 0, user_id: 3, image: 'https://www.rareseeds.com/media/catalog/product/cache/c47cc5acc2b9ab2a357f100ee4780008/G/a/Garden-Berries-Chinese-Lantern-IMG_0701-lantern-fl-lit.jpg'};

      await request(server).post('/api/plants').send(plant);

      db('plants').where('plant_id', expected.id).first()
        .then(actual => {
          expect(actual).toMatchObject(expected);
        });

      });

      it('responds with proper error for missing plant data', async () => {
        const plant = {nickname: 'Lotus', species: "Nelumbo nucifera", h2oFrequency: 8};

        const response = await request(server).post('/api/plants').send({ nickname: 'Lotus' });

        // expect(response.body.message).toEqual('Nickname, Species, Watering Frequency, and User ID required.');
      });
  });

  describe('[PUT]', () => {
    it('can update a plant by id', async () => {
      const response = await request(server).put('/api/plants/1').send({ nickname: 'Basil' });

      expect(response.body[0].nickname).toEqual('Basil');
    })

    it('responds with proper error for invalid ID', async () => {
      const response = await request(server).put('/api/plants/8').send({ nickname: 'Basil' });

      expect(response.body.message).toEqual('Plant with this ID not found.');
    });
  });

  describe('[DELETE]', () => {
    it('can delete a plant by ID', async () => {
      await request(server).delete('api/plants/1');
  
      const response = await request(server).get('/api/plants');
      console.log(response.body)
      expect(response.body.length).toBe(2);
    })
})
});