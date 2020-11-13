import{
ADD_RECIPE,
DELETE_RECIPE,
SET_CURRENT,
CLEAR_CURRENT,
UPDATE_CURRENT,
FILTER_RECIPES,
CLEAR_FILTER, 
SET_ALERT,
REMOVE_ALERT,
} from '../types';

export default (state, action) => {
    switch(action.type){
        case ADD_RECIPE:
            return{
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        default:
            return state;
    }
}