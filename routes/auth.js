const express = require('express');
const router = express.Router();

// @Route   GET api/auth
// desc     Get logged in user
// Access   Private
router.get('/', (req, res) => {
  res.send('Get a logged in user');
})

// @Route   POST api/auth
// desc     Log in user and get token
// Access   Public
router.post('/', (req, res) => {
  res.send('Log in user');
})

module.exports = router