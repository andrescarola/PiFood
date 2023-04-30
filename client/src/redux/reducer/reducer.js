import { FILTER_RECIPES_BY_DIETS, FILTER_RECIPES_BY_ORIGIN, GET_RECIPES, SORT_BY_HEALTHSCORE, SORT_BY_TITLE, GET_RECIPES_BY_TITLE, GET_DIETS, GET_RECIPE_DETAIL } from "../actions/actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            };

        case GET_RECIPES_BY_TITLE:
            return {
                ...state,
                recipes: action.payload,
                
            };

        case GET_RECIPE_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            };

        case FILTER_RECIPES_BY_ORIGIN:
            const allRecipes = state.allRecipes;
            const origin = action.payload === 'db' ? allRecipes.filter(el => el.created) : allRecipes.filter(el => !el.created);

            return {
                ...state,
                recipes: action.payload === 'all' ? allRecipes : origin
            };

        case FILTER_RECIPES_BY_DIETS:
            const allRecipes2 = state.allRecipes;

            const filtered = action.payload === 'all' ? allRecipes2
                : allRecipes2.filter(el => el.diets.some(diet => diet === action.payload))

            return {
                ...state,
                recipes: filtered
            }

        case SORT_BY_TITLE:

            const sort = action.payload === 'ascendent'
                ? [...state.recipes].sort((a, b) => a.title.localeCompare(b.title)) :
                [...state.recipes].sort((a, b) => b.title.localeCompare(a.title))

            return {
                ...state,
                recipes: sort
            }

        case SORT_BY_HEALTHSCORE:

            const sortByHs = action.payload === 'ascendent'
                ? [...state.recipes].sort((a, b) => a.healthScore - b.healthScore) :
                [...state.recipes].sort((a, b) => b.healthScore - a.healthScore)

            return {
                ...state,
                recipes: sortByHs
            }

        default:
            return {
                ...state
            };
    }
};

export default rootReducer;