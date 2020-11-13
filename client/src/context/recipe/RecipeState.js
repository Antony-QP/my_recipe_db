import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeContext from './recipeContext'
import recipeReducer from './recipeReducer'
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CURRENT,
  FILTER_RECIPES,
  CLEAR_FILTER
} from '../types'

const RecipeState = props => {
  const initialState = {
    recipes: [
      {
        "id" : "1",
        "img" : "https://www.hairybikers.com/uploads/images/_opengraphTwitterImage/ChilliConCarne.jpg",
        "title" : "Chilli con Carne",
        "ingredients" : [
            {
            "name" : "Beef",
            "amount": "2000"
            },
            {
            "name" : "Tinned tomatoes",
            "amount": "500"
            }
        ],
        "method" : "Fry the meat and mix it with some beans",
        "serves" : "5"
    },
    {
      "id" : "2",
      "img" : "https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg",
      "title" : "Hamburger",
      "ingredients" : [
          {
          "name" : "Beef",
          "amount": "2000"
          },
          {
          "name" : "Bread",
          "amount": "500"
          }
      ],
      "method" : "Combine the meat, fry it and stick it in a bun",
      "serves" : "5"
  },
  {
    "id" : "3",
    "img" : "https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/4417/letterbox_Meatlessfarm_Lasagne.jpg",
    "title" : "Lasagne",
    "ingredients" : [
        {
        "name" : "Beef",
        "amount": "2000"
        },
        {
        "name" : "Tinned tomatoes",
        "amount": "500"
        }
    ],
    "method" : "Fry the meat, stick in between some sheets",
    "serves" : "5"
}
    ]
  };

// Allows us to access state and dispatch to the reducer 
const [state, dispatch] = useReducer(recipeReducer, initialState)

// Add recipe
const addRecipe = recipe => {
recipe.id = uuidv4();
dispatch({ type: ADD_RECIPE, payload:recipe})
}

// Delete recipe

// Set current recipe

// Clear current recipe

// Update recipe

// Filter recipes

// Clear filter

  return (
    <RecipeContext.Provider 
      value = {{
        recipes :state.recipes,
        addRecipe
      }}
    >
    {props.children}
   </RecipeContext.Provider>
  )
}

export default RecipeState