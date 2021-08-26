var express = require('express');
var app = express();

var connection = require('./database/connection');
var Users = require('./controller/User/UserController');
var Posts = require('./controller/Post/PostController');
var Evaluations = require('./controller/Evaluation/EvaluationController');

app.use(express.json());

connection
  .authenticate()
  .then(() => {
    console.log('Connected with database')
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/', Users);
app.use('/', Posts);
app.use('/', Evaluations);

app.get('/', (req, res) => {
  res.json({msg: 'Welcome to the index'})
});

app.listen(3333, () => {
  console.log('running on port 3333');
});
