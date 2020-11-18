import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeContext from './recipeContext'
import recipeReducer from './recipeReducer'
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
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
        "method" : "First, make the béchamel sauce. Put the milk, onion, bay leaves and cloves into a large saucepan and bring very gently just up to the boil. Turn off the heat and set aside for 1 hr to infuse. For the meat sauce, put the oil, celery, onion, carrot, garlic and pancetta in another large saucepan. Gently cook together until the veg is soft but not coloured. Tip in the beef and pork mince, the milk and chopped tomatoes. Using a wooden spoon, stir together and break up and mash the lumps of mince against the sides of the pan. When the mince is mostly broken down, stir in all the herbs, the stock cubes and the red wine, and bring to a simmer. Cover and cook for 1 hr, stirring occasionally to stop the bottom catching.",
        "serves" : "5",
        "time" : "1.5"
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
      "serves" : "5",
      "time" : "1.5"
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
    "serves" : "5",
    "time" : "1.5"
}
    ],
    current: null,
    filtered: null
  };

// Allows us to access state and dispatch to the reducer 
const [state, dispatch] = useReducer(recipeReducer, initialState)

// Add recipe
const addRecipe = recipe => {
recipe.id = uuidv4();
dispatch({ type: ADD_RECIPE, payload:recipe})
}

// Delete recipe
const deleteRecipe = id => {
  dispatch({ type: DELETE_RECIPE, payload:id})
  }

// Set current recipe
const setCurrent = recipe => {
  dispatch({ type: SET_CURRENT, payload: recipe})
  }

// Clear current recipe
const clearCurrent = () => {
  dispatch({ type: CLEAR_CURRENT})
  }

// Update recipe
const updateRecipe = recipe => {
  dispatch({ type: UPDATE_RECIPE, payload: recipe})
  }
// Filter recipes
const filterRecipes = text => {
  dispatch({ type: FILTER_RECIPES, payload: text})
  }

// Clear filter
const clearFilter = () => {
  dispatch({ type: CLEAR_FILTER})
  }

  return (
    <RecipeContext.Provider 
      value = {{
        recipes :state.recipes,
        current : state.current,
        filtered : state.filtered,
        addRecipe,
        deleteRecipe,
        setCurrent,
        clearCurrent,
        updateRecipe,
        filterRecipes,
        clearFilter
      }}
    >
    {props.children}
   </RecipeContext.Provider>
  )
}

export default RecipeState