import React, {Fragment, useContext} from 'react'
import RecipeContext from '../../context/recipe/recipeContext'
import M from 'materialize-css';
import $ from 'jquery'




export const Recipes = () => {
  const recipeContext = useContext(RecipeContext)

  const { recipes } = recipeContext

  return (
    <div>
      {recipes.map(recipe => <div>{recipe.title}</div>)}
    </div>  
  )
}

export default Recipes