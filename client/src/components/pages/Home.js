import React, { Fragment, useContext, useEffect } from "react";
import Recipes from "../recipes/Recipes";
import M from "materialize-css";
import $ from "jquery";
import RecipeSlider from "../recipes/Recipe_Slider";
import RecipeForm from "../recipes/Recipe_Form";
import Recipe_Filter from "../recipes/Recipe_Filter";
import AuthContext from "../../context/auth/auth_Context";
import RecipeContext from "../../context/recipe/recipeContext";
import { Link, Redirect } from "react-router-dom";

export const Home = () => {
  const authContext = useContext(AuthContext);
  const recipeContext = useContext(RecipeContext);

  const { current } = recipeContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      {current ? (
        <RecipeForm />
      ) : (
        <Fragment>
          <Recipe_Filter />
          <RecipeSlider />
          <Fragment>
            <br></br>
            <br></br>
            <div className='center'>
              <Link
                class='btn-floating btn-large waves-effect waves-light secondary link'
                to='/add'>
                <i className='fas fa-plus'></i>
              </Link>
            </div>
          </Fragment>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
