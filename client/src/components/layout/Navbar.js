import React, { useContext, Fragment } from "react";
import AuthContext from "../../context/auth/auth_Context";
import RecipeContext from '../../context/recipe/recipeContext'
import RecipeFilter from '../recipes/Recipe_Filter'
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import m from "materialize-css";
import { CLEAR_RECIPES } from "../../context/types";

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const recipeContext = useContext(RecipeContext)

  const { isAuthenticated, logout, user } = authContext;
  const { clearRecipes } = recipeContext

  const onLogout = () => {
    logout();
    clearRecipes()
  };

  const authLinks = (
    <Fragment>
      <ul className='right hide-on-med-and-down'>
        <li>Hello, {user && user.name}</li>
        <li>
          <a href='#!' onClick={onLogout}>
            <i className='fas fa-sign-out-alt'></i>
          </a>
        </li>
      </ul>
      <ul className='left hide-on-med-and-down '>
      <li><RecipeFilter/></li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul className='right hide-on-med-and-down'>
        <li>
          <Link className='link' to='/login'>
            Login
          </Link>
        </li>
        <li>
          <Link className='link' to='/register'>
            Register
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <nav>
      <div className='nav-wrapper'>
      {/* <RecipeFilter/> */}
        <a href='#' className='brand-logo center'>
          My Recipe<strong style={{ color: "var(--orange-color)" }}> DB</strong>
          .
        </a>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
