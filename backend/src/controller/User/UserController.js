var express = require('express');
var router = express.Router();

router.get('/users', (req, res) => {res.json({msg: 'Get users on port 3333'})});

module.exports = router;
