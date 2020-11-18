import React, { useContext} from "react";
import PropTypes from "prop-types";
import RecipeContext from '../../context/recipe/recipeContext'

export const RecipeItem = ({ recipe }) => {

const recipeContext = useContext(RecipeContext)

  const { id, img, title, ingredients, method, serves, time } = recipe;
  const { deleteRecipe, setCurrent, clearCurrent } = recipeContext

  const onDelete = () => {
    deleteRecipe(id);
    clearCurrent();
  }

  return (
    <div className='row'>
      <div className='col s12 m7'>
        <div className='card'>
          <div class='card-image'>
            <img className='activator' src={img}></img>
          </div>
          <div className='card-content'>
            <span className='card-title activator'>{title}</span>
          </div>
          <div className='card-reveal'>
            <span className='card-title activator'>
              {title}
              <i class=' far fa-window-close right'></i>
            </span>
            <p>Serves : {serves}</p>
            <p>Time (hrs) : {time}</p>
            <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient.name + " : " + ingredient.amount}</li>
              ))}
            </ul>
              <p>{method}</p>
          </div>
          <div className='card-action'>
          <a class="waves-effect waves-light btn-small green" onClick={() => setCurrent(recipe)}>Edit</a>
          <a class="waves-effect waves-light btn-small red" onClick={onDelete}>Delete</a>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeItem.prototype = {
  recipe: PropTypes.object,
};

export default RecipeItem;
