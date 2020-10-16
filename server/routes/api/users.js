const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//  Connect to user collectio
let loadUserCollection = async () => {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://milton:milton@bbgcluster-m9enp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  );

  return client.db('BbgCluster').collection('Users');
};

// Get all
router.get('/', async (req, res) => {
  const users = await loadUserCollection();
  res.header(
    'Content-Range',
    `users 0-20/${(await users.find({}).toArray()).length}`
  );
  res.send(await users.find({}).toArray());
  console.log('called');
});

module.exports = router;
