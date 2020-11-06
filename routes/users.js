const express = require('express');
const router = express.Router();

// @Route   Post api/users
// desc     Register a user 
// Access   Public
router.post('/', (req, res) => {
  res.send('Register a user');
})

module.exports = router