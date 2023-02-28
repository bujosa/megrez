const express = require('express');
const verifyProof = require('../utils/verifyProof');
const bodyParser = require('body-parser');
const niceList = require('../utils/niceList');
const MerkleTree = require('../utils/MerkleTree');
const merkleTree = new MerkleTree(niceList);

const app = express();
app.use(bodyParser.json());

const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  const { name } = req.body;
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send('You got a toy robot!');
  } else {
    res.send('You are not on the list :(');
  }
});

const port = 1225;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
