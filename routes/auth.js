const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require ('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @Route   GET api/auth
// desc     Get logged in user
// Access   Private
router.get('/', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @Route   POST api/auth
// desc     Log in user and get token
// Access   Public
router.post('/',[

  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()

],
  async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
  return res.status(400).json({ errors : errors.array()})
  }

  // Extract email and password from the request body
  const { email, password } = req.body

  try{
    let user = await User.findOne({email})

    if(!user){
      return res.status(400).json({ msg : 'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({ msg : 'Invalid credentials'})
    }

    // If the user exists and the passwords match then generate a token

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
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router