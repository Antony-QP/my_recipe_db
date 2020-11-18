import React, { useContext, useRef, useEffect } from 'react'
import RecipeContext from '../../context/recipe/recipeContext'

export const Recipe_Filter = () => {

    const recipeContext = useContext(RecipeContext)
    const text = useRef('')

    const { filterRecipes, clearFilter, filtered} = recipeContext

    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    })

    const onChange = (e) => {
        if(text.current.value !== ''){
            filterRecipes(e.target.value);
        }else{
            clearFilter()
        }
    }

    return (
        <form>
            <input ref={text} placeholder="Filter Recipes" onChange={onChange}/>
        </form>
    )
}

export default Recipe_Filter