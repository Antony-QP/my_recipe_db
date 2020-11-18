import React from 'react'
import Recipes from '../recipes/Recipes'
import M from 'materialize-css';
import $ from 'jquery'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import RecipeSlider from '../recipes/Recipe_Slider'
import RecipeForm from '../recipes/Recipe_Form'
import Recipe_Filter from '../recipes/Recipe_Filter'

// $(window).on("load", function(){
//   $('.carousel').carousel();
// });
    

export const Home = () => {
  return (
    <div className='container'>
        <h1>My Recipes</h1>
        <Recipe_Filter/>
        <RecipeSlider/>
        <br></br>
        <RecipeForm/>
    </div>
  )
}

export default Home