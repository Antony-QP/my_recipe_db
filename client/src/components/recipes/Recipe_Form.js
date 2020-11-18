import React, { useState, useContext, useEffect } from "react";
import RecipeContext from "../../context/recipe/recipeContext";
import RecipeItem from "./Recipe_Item";
import immer, { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import shortid, { generate } from "shortid";

export const Recipe_Form = () => {
  const recipeContext = useContext(RecipeContext);

  const { addRecipe, current, clearCurrent, updateRecipe } = recipeContext

  useEffect(() => {
    if(current !== null){
      setRecipe(current)
    }else{
      setRecipe({
        title: "",
        img: "",
        ingredients: [],
        method: "",
        serves: "",
        time: "",
      });
    }
  }, [recipeContext, current])

  const [recipe, setRecipe] = useState({
    title: "",
    img: "",
    ingredients: [],
    method: "",
    serves: "",
    time: "",
  });

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(current === null){
      addRecipe(recipe);
    }else{
      updateRecipe(recipe)
    }
    clearAll()
  };

  const clearAll = () => {
    clearCurrent()
  }

  const { title, img, ingredients, method, serves, time } = recipe;

  return (
    <div className='row center-align'>
      <h3>{current ? 'Edit Recipe' : 'Add Recipe'}</h3>
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
              <button
                onClick={() => {
                  setRecipe({
                    ingredients: ingredients.filter((x) => x.id !== i.id),
                  });
                }}>
                X
              </button>
            </div>
          );
        })}
        <a
          onClick={() => {
            setRecipe({
              ...recipe,
              ingredients: [
                ...ingredients,
                {
                  id: generate(),
                  name: "",
                  amount: "",
                },
              ],
            });
          }}
          className='btn-floating btn-large waves-effect waves-light red'>
          <i className='fas fa-plus'></i>
        </a>
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
          {current ? 'Update Recipe' : 'Add Recipe'}
        </button>
        {current && <div><button onClick={clearAll}>Clear</button></div>}
      </form>
      {JSON.stringify(ingredients, null, 2)}
    </div>
  );
};

export default Recipe_Form;
