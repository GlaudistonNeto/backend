var express = require('express');
var router = express.Router();

router.get('/posts', (req, res) => {res.json({msg: 'Get posts on port 3333'})});

module.exports = router;
