import React, { useState, useContext } from "react";
import RecipeContext from "../../context/recipe/recipeContext";
import RecipeItem from "./Recipe_Item";
import immer, { produce } from "immer";
import { v4 as uuidv4 } from 'uuid';
import shortid, {generate} from 'shortid'

export const Recipe_Form = () => {
  const recipeContext = useContext(RecipeContext);

  const [recipe, setRecipe] = useState({
    title: "",
    img: "",
    ingredients: [{ id: "1", name: "cheese", amount: "200" }],
    method: "",
    serves: "",
    time: "",
  });

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    recipeContext.addRecipe(recipe);
    setRecipe({
      title: "",
      img: "",
      ingredients: [],
      method: "",
      serves: "",
      time: "",
    });
  };

  const { title, img, ingredients, method, serves, time } = recipe;

  return (
    <div className='row center-align'>
      <form className='col s12' onSubmit={onSubmit}>
        {/* Image */}
        <div className='input-field col s12 center-align'>
          <input
            type='text'
            placeholder='Please enter an image url'
            name='img'
            value={img}
            onChange={onChange}
          />
        </div>
        {/* Title */}
        <div className='input-field col s12 center-align'>
          <input
            type='text'
            placeholder='Please enter recipe title'
            className='validate'
            name='title'
            value={title}
            onChange={onChange}
          />
        </div>
        <a onClick={() => {
          setRecipe({
            ...recipe,
            ingredients: [...ingredients, {
              id: generate(),
              name: '',
              amount: ''
            }]
          })
        }} 
        className='btn-floating btn-large waves-effect waves-light red'>
          <i className='fas fa-plus'></i>
        </a>
        {ingredients.map((i) => {
          return (
            <div key={i.id}>
              <input
                onChange={(e) => {
                  const name = e.target.value;
                  setRecipe({
                    ...recipe,
                    ingredients: recipe.ingredients.map((x) =>
                      x.id === i.id
                        ? {
                            ...x,
                            name,
                          }
                        : x
                    ),
                  });
                }}
                value={i.name}
                placeholder='ingredient'
              />
              <input
                onChange={(e) => {
                  const amount = e.target.value;
                  setRecipe({
                    ...recipe,
                    ingredients: recipe.ingredients.map((x) =>
                      x.id === i.id
                        ? {
                            ...x,
                            amount,
                          }
                        : x
                    ),
                  });
                }}
                value={i.amount}
                placeholder='amount'
              />
              <button onClick={() => {
                setRecipe({
                  ingredients: ingredients.filter(x => x.id !== i.id)
                })
              }}>X</button>
            </div>
          );
        })}
        {/* Method */}
        <div className='methodContainer'>
          <div className='row method-line'>
            <div className='input-field col s12 center-align'>
              <input
                type='text'
                placeholder='Please enter method'
                className='validate'
                name='method'
                value={method}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        {/* Serves */}
        <div className='input-field col s12 center-align'>
          <input
            type='number'
            placeholder='Number of servings'
            className='validate'
            name='serves'
            value={serves}
            onChange={onChange}
          />
        </div>
        {/* Time */}
        <div className='input-field col s12 center-align'>
          <input
            type='text'
            placeholder='Time to compelete...'
            className='validate'
            name='time'
            value={time}
            onChange={onChange}
          />
        </div>
        <br></br>
        <button
          className='btn waves-effect waves-light'
          type='submit'
          name='action'>
          Submit
        </button>
      </form>
      {JSON.stringify(ingredients, null, 2)}
    </div>
  );
};

export default Recipe_Form;
