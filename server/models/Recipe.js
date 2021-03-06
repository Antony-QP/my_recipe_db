const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  img:{
    type: String,
  },
  title:{
    type: String,
    required: true,
  },
  ingredients:{
    type: Array,
    required: true,
      name: {
        type: String
      },
      quantity : {
        type: Number
      }
  },
  method:{
    type: Array,
    required: true
  },
  serves:{
    type: Number,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('recipe', RecipeSchema)