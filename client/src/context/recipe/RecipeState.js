import React, { useReducer } from "react";
import RecipeContext from "./recipeContext";
import recipeReducer from "./recipeReducer";
import axios from "axios";
import {
  GET_RECIPES,
  CLEAR_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_FILTER,
  RECIPE_ERROR,
} from "../types";

const RecipeState = (props) => {
  const initialState = {
    recipes: [],
    current: null,
    filtered: null,
    error: null,
  };

  // Allows us to access state and dispatch to the reducer
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Get contacts
  const getRecipes = async () => {
    try {
      const res = await axios.get("/api/recipes");
      dispatch({ type: GET_RECIPES, payload: res.data });
    } catch (err) {
      dispatch({ type: RECIPE_ERROR, payload: err.response.msg });
    }
  };

  // Add recipe
  const addRecipe = async (recipe) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/recipes", recipe, config);
      dispatch({ type: ADD_RECIPE, payload: res.data });
    } catch (err) {
      dispatch({ type: RECIPE_ERROR, payload: err.response.msg });
    }
  };

  // Update recipe
  const updateRecipe = async (recipe) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/recipes/${recipe._id}`, recipe, config);
      dispatch({ type: UPDATE_RECIPE, payload: res.data });
    } catch (err) {
      dispatch({ type: RECIPE_ERROR, payload: err.response.msg });
    }
  };

  // Delete recipe
  const deleteRecipe = async (id) => {
    try {
      const res = await axios.delete(`/api/recipes/${id}`);
      dispatch({ type: DELETE_RECIPE, payload: id });
    } catch (err) {
      dispatch({ type: RECIPE_ERROR, payload: err.response.msg });
    }
  };

  // Clear Recipes
  const clearRecipes = () => {
    dispatch({ type: CLEAR_RECIPES });
  };

  // Set current recipe
  const setCurrent = (recipe) => {
    dispatch({ type: SET_CURRENT, payload: recipe });
  };

  // Clear current recipe
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter recipes
  const filterRecipes = (text) => {
    dispatch({ type: FILTER_RECIPES, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addRecipe,
        deleteRecipe,
        setCurrent,
        clearCurrent,
        updateRecipe,
        filterRecipes,
        clearFilter,
        getRecipes,
        clearRecipes,
      }}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
