import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_RECIPES_BY_DIETS = 'FILTER_RECIPES_BY_DIETS';
export const FILTER_RECIPES_BY_ORIGIN= 'FILTER_RECIPES_BY_ORIGIN';
export const SORT_BY_TITLE = 'SORT_BY_TITLE';
export const SORT_BY_HEALTHSCORE = 'SORT_BY_HEALTHSCORE'

export const getRecipes = () => {
    return async function (dispatch) {
            const recipes = await axios.get('http://localhost:3001/recipes');
            dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            });  
    }
};

export const filterRecipesByDiets = (payload) => {
    return {
        type: FILTER_RECIPES_BY_DIETS,
        payload
    }
};

export const filterRecipesByOrigin = (payload) => {
    return {
        type: FILTER_RECIPES_BY_ORIGIN,
        payload
    }
};

export const sortByTitle = (payload) => {
    return {
        type: SORT_BY_TITLE,
        payload
    }
};

export const sortByHealthScore = (payload) => {
    return {
        type: SORT_BY_HEALTHSCORE,
        payload
    }
};
