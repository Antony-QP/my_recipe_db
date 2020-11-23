import React, { useState, useContext, useEffect } from "react";
import RecipeContext from "../../context/recipe/recipeContext";
import AuthContext from "../../context/auth/auth_Context";
import RecipeItem from "./Recipe_Item";
import immer, { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import shortid, { generate } from "shortid";

export const Recipe_Form = () => {
  const history = useHistory();

  const goToHomePage = () => {
    let path = "/";
    history.push(path);
  };
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const recipeContext = useContext(RecipeContext);

  const { addRecipe, current, clearCurrent, updateRecipe } = recipeContext;

  useEffect(() => {
    if (current !== null) {
      setRecipe(current);
    } else {
      setRecipe({
        title: "",
        img: "",
        ingredients: [],
        method: "",
        serves: "",
        time: "",
      });
    }
  }, [recipeContext, current]);

  const [recipe, setRecipe] = useState({
    title: "",
    img: "",
    ingredients: [],
    method: "",
    serves: "",
    time: "",
  });

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  // Image upload
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = (base64EncodedImage) => {
    try {
      fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
        // mode: 'no-cors'
      })
        .then((res) => res.json())
        .then((data) => {
          return data.url;
        })
        .then((url) => {
          setRecipe({
            ...recipe,
            img: url,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addRecipe(recipe);
    } else {
      updateRecipe(recipe);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const { title, img, ingredients, method, serves, time } = recipe;

  return (
    <div id="ingredContainer">
    <div className='row center-align'>
    <h3>{current ? "Edit Recipe" : "Add Recipe"}</h3>
    <form onSubmit={handleSubmitFile}>
      {/* Image */}
      <div className='input-field col s12 center-align text-center'>
        <input
          id='img'
          className='center'
          type='file'
          name='img'
          onChange={handleFileInputChange}></input>
      </div>
      {previewSource && (
        <img
          src={previewSource}
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "5px",
          }}></img>
      )}
      {previewSource && (
        <div className='input-field col s12 center-align'>
          <button
            className='btn waves-effect waves-light secondary'
            type='submit'
            name='action'>
            Upload Image
          </button>
        </div>
      )}
    </form>
    {/* Title */}
    <form className='col s12' id="ingredForm" onSubmit={onSubmit}>
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
              className = 'btn waves-effect waves-light secondary text-1'
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
        className='btn waves-effect waves-light primary'>
        Add Ingredient
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
        className='btn waves-effect waves-light secondary'
        type='submit'
        name='action'
        onClick={goToHomePage}>
        {current ? "Update Recipe" : "Add Recipe"}
      </button>
      {current && (
        <div>
          <button onClick={clearAll}>Clear</button>
        </div>
      )}
    </form>
    {JSON.stringify(ingredients, null, 2)}
    {JSON.stringify(img)}
  </div>
  </div>
  );
};

export default Recipe_Form;
