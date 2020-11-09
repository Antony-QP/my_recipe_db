const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require ('config')
const { check, validationResult } = require('express-validator');


const User = require('../models/User')
// @Route   Post api/users
// desc     Register a user 
// Access   Public
router.post('/',[
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
], 
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
  return res.status(400).json({ errors : errors.array()})
  }
// Pull data from the body of the post request
  const { name, email, password } = req.body;
  
  try{
    // Use the email to search the database to see if user already exists
    let user = await User.findOne({ email : email})
    
    if(user){
      return res.status(400).json({ msg : 'User already exists'})
    }
  
  // If no user found in the DB then instantiate a new user from the user model
    user = new User({
      name : name,
      email : email,
      password : password
    })

  // Need to hash the password. Bcrypt returns a promise

  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(password, salt)

  // Save user to the database
  await user.save()

  // Once user is added to the database a token must be issued in order to stay logged in and view private routes

  const payload = {
    user : {
      id : user._id
    }
  }

  jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: 360000
  }, (err, token)=> {
    if(err) throw err;{
      res.json({token})
    }
  })

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

module.exports = router