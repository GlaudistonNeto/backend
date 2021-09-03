var express = require('express');
var router = express.Router();

router.get('/evaluations', (req, res) => {res.json({msg: 'Get evaluations on port 3333'})});

module.exports = router;
