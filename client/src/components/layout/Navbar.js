import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/auth_Context";
import RecipeContext from '../../context/recipe/recipeContext'
import RecipeFilter from '../recipes/Recipe_Filter'
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import M from "materialize-css";
import { CLEAR_RECIPES } from "../../context/types";
import $ from 'jquery'


export const Navbar = () => {

  useEffect(() => {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
  })

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
    <li><a className="right dropdown-trigger" href="#!" data-target="dropdown1"><i className="fas fa-bars"></i></a></li>
      <ul className='right dropdown-content' id="dropdown1">
        <li>Hello, {user && user.name}</li>
        <li>
          <a href='#!' onClick={onLogout}>
            Sign Out
          </a>
        </li>
      </ul>
      <ul className='left hide-on-med-and-down '>
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
        <Link to='/' className='brand-logo center'>
          My Recipe<strong style={{ color: "var(--orange-color)" }}> DB</strong>
          .
        </Link>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
