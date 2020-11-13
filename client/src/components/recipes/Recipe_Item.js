import React from "react";
import PropTypes from "prop-types";

export const RecipeItem = ({ recipe }) => {
  const { img, title, ingredients, method, serves } = recipe;

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
            <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient.name + " : " + ingredient.amount}</li>
              ))}
            </ul>
              <p>{method}</p>
          </div>
          <div className='card-action'>
            <a href='#'>This is a link</a>
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
