var express = require('express');
var app = express();
var connection = require('./database/connection');

app.use(express.json());

connection
  .authenticate()
  .then(() => {
    console.log('Connected with database')
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  res.json({msg: 'Welcome to the index'})
});

app.listen(3333, () => {
  console.log('running on port 3333');
});
