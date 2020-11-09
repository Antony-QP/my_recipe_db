const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const User = require('../models/User')
const Recipe = require('../models/Recipe')


// @Route   GET api/recipes
// desc     Get all recipes
// Access   Private
router.get('/', auth, async (req, res) => {
  try{
    const recipes = await Recipe.find({ user : req.user.id }).sort({ data: -1 })
    res.json(recipes)
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @Route   POST api/recipes
// desc     Add new recipe
// Access   Private
router.post('/', [auth, [
  check('title', 'Title is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
  return res.status(400).json({ errors : errors.array()})
  }

  const { img, title, ingredients, method, serves } = req.body

  try {
    const newRecipe = new Recipe({
      img : img,
      title : title,
      ingredients : ingredients,
      method : method,
      serves : serves,
      user: req.user.id
    })

    const recipe = await newRecipe.save();
    res.json(recipe)
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @Route   PUT api/recipes/:id
// desc     Update recipe
// Access   Private
router.put('/:id', auth, async (req, res) => {
  
  const { img, title, ingredients, method, serves } = req.body
  
  // Build recipe object
  const recipeFields = {}
  if(img) recipeFields.img = img
  if(title) recipeFields.title = title
  if(ingredients) recipeFields.ingredients = ingredients
  if(method) recipeFields.method = method
  if(serves) recipeFields.serves = serves

  try{
    let recipe = await Recipe.findById(req.params.id)

    if(!recipe) return res.status(404).json({ msg : 'Contact not found'})

    // Make sure user owns repcipe

    if(recipe.user.toString() !== req.user.id){
      return res.status(401).json({ msg : 'Not authorised '})
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, 
      { $set : recipeFields},
      { new : true }
      )
      res.json(recipe)
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @Route   DELETE api/recipes/:id
// desc     Delete recipe
// Access   Private
router.delete('/:id', auth, async (req, res) => {
  try{
    let recipe = await Recipe.findById(req.params.id)

    if(!recipe) return res.status(404).json({ msg : 'Recipe not found'})

    // Make sure user owns repcipe

    if(recipe.user.toString() !== req.user.id){
      return res.status(401).json({ msg : 'Not authorised '})
    }

    await Recipe.findByIdAndRemove(req.params.id)

    res.json({ msg : 'Recipe removed'})
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


module.exports = router