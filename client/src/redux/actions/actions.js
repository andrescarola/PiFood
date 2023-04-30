import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_TITLE = 'GET_RECIPES_BY_TITLE';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_RECIPES_BY_DIETS = 'FILTER_RECIPES_BY_DIETS';
export const FILTER_RECIPES_BY_ORIGIN = 'FILTER_RECIPES_BY_ORIGIN';
export const SORT_BY_TITLE = 'SORT_BY_TITLE';
export const SORT_BY_HEALTHSCORE = 'SORT_BY_HEALTHSCORE';


export const getRecipes = () => {
    return async function (dispatch) {
        try {
            const recipes = await axios.get('http://localhost:3001/recipes');
            dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export const getRecipesByTitle = (title) => {
    return async function (dispatch) {
        try {
            const recipes = await axios.get(`http://localhost:3001/recipes?title=${title}`);
            dispatch({
                type: GET_RECIPES_BY_TITLE,
                payload: recipes.data
            });
        } catch (error) {
            alert('No recipes have been found matching your search')
            console.log(error);
        }
    }
};

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        try {
            const details = await axios.get(`http://localhost:3001/recipes/${id}`)
            dispatch({
                type: GET_RECIPE_DETAIL,
                payload: details.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};


export const getDiets = () => {
    return async function (dispatch) {
        try {
            const diets = await axios.get('http://localhost:3001/diets');
            const dietsSorted = diets.data.sort((a, b) => a.name.localeCompare(b.name));
            dispatch({
                type: GET_DIETS,
                payload: dietsSorted
            });
        } catch (error) {
            console.log(error);
        }
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


  

