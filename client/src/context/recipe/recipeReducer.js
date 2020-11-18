import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_FILTER,
  RECIPE_ERROR,
  SET_ALERT,
  REMOVE_ALERT,
  GET_RECIPES,
  CLEAR_RECIPES,
} from "../types";
import recipeContext from "./recipeContext";

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return{
        ...state,
        recipes : action.payload,
      }
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [ action.payload, ...state.recipes],
        loading:false
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
        loading:false
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe._id !== action.payload),
        loading:false
      };
    case CLEAR_RECIPES:
      return{
        ...state,
        recipes : null,
        filtered : null,
        error : null,
        current : null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_RECIPES:
      return {
        ...state,
        filtered: state.recipes.filter((recipe) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return recipe.title.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};
