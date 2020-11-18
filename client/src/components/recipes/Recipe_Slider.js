import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Slider from "react-slick";
import RecipeContext from "../../context/recipe/recipeContext";
import RecipeItem from "../recipes/Recipe_Item";

export default function RecipeSlider() {
  const recipeContext = useContext(RecipeContext);

  const { recipes, filtered } = recipeContext;

  if (recipes.length === 0) {
    return <h4>Please add a recipe</h4>;
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <TransitionGroup>
    <Slider {...settings}>
        {filtered !== null
          ? filtered.map((recipe) => (
              <CSSTransition key={recipe.id} timeout={500} classNames='my-node'>
                <RecipeItem recipe={recipe} />
              </CSSTransition>
            ))
          : recipes.map((recipe) => (
              <CSSTransition key={recipe.id} timeout={500} classNames='my-node'>
                <RecipeItem key={recipe.id} recipe={recipe} />
              </CSSTransition>
            ))}
    </Slider>
    </TransitionGroup>
  );
}

{
  /* Ingredients */
}
{
  /* <div className='ingredientContainer'>
          <div className='row ingredient-line'>
            <div className='input-field col s6 center-align'>
              <input
                type='text'
                placeholder='Please enter ingredients'
                className='validate'
                name='ingredient'
                value={ingredients.ingredient}
                onChange={onChange}
              />
            </div>
            <div className='input-field col s6 center-align'>
              <input
                type='number'
                placeholder='Please enter ingredients'
                className='validate'
                name='amount'
                value={ingredients.amount}
                onChange={onChange}
              />
              <label htmlFor='amount'>Amount</label>
            </div>
          </div>
        </div>
        <a class='btn-floating btn-large waves-effect waves-light red'>
          <i className='fas fa-plus'></i>
        </a> */
}
