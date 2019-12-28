const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

//GET
router.get('/', async(req, res) => {
const posts = await loadPostsCollection();
res.send(await posts.find({}).toArray());
res.end();
});
//ADD
async function loadPostsCollection(){
        const uri = "+srv://abc123:<password>@cluster0-cox39.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("vue_express").collection("posts");
  // perform actions on the collection object
  client.close();
});
return collection.find({}).toArray();
}

//POST 
module.exports = router;