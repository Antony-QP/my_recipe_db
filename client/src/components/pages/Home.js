import React, { useContext, useEffect } from 'react'
import Recipes from '../recipes/Recipes'
import M from 'materialize-css';
import $ from 'jquery'
import RecipeSlider from '../recipes/Recipe_Slider'
import RecipeForm from '../recipes/Recipe_Form'
import Recipe_Filter from '../recipes/Recipe_Filter'
import AuthContext from '../../context/auth/auth_Context'

export const Home = () => {

  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container'>
        <Recipe_Filter/>
        <RecipeSlider/>
        <br></br>
        <br></br>
    </div>
    
  )
}

export default Home