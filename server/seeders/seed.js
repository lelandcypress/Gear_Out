const db = require('../config/connection');
const { Items, User } = require('../models');
const itemSeeds = require('./itemSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Items.deleteMany({});
    await Items.create(itemSeeds);
    console.log('Items seeded!');
    await User.deleteMany({});
    await User.create(userSeeds);

    console.log('Users seeded!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
