const express = require('express');
const router = express.Router();

// @Route   GET api/recipes
// desc     Get all recipes
// Access   Private
router.get('/', (req, res) => {
  res.send('Get all recipes');
})

// @Route   POST api/recipes
// desc     Add new recipe
// Access   Private
router.post('/', (req, res) => {
  res.send('Add new recipe');
})

// @Route   PUT api/recipes/:id
// desc     Update recipe
// Access   Private
router.put('/:id', (req, res) => {
  res.send('Update recipe');
})

// @Route   DELETE api/recipes/:id
// desc     Delete recipe
// Access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete recipe');
})


module.exports = router