const { Recipe } = require('../db');
const axios = require('axios');
const arrayMapper = require('../utils/arrayMapper');
const { API_KEY_ONE } = process.env;

const searchRecipeByName = async (title) => {

    // const query = title.toLowerCase();

    const databaseRecipes = await Recipe.findAll({ where: { title: title } });

    const apiRecipesImport = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`)
    ).data.results;

    const apiRecipes = arrayMapper(apiRecipesImport);

    const apiRecipesFiltered = apiRecipes.filter((recipe) => recipe.title.toLowerCase().includes(title.toLowerCase));

    return [...databaseRecipes, ...apiRecipesFiltered];
};

const getAllRecipes = async () => {

    const databaseRecipes = await Recipe.findAll();

    const apiRecipesImport = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`)
    ).data.results;

    const apiRecipes = arrayMapper(apiRecipesImport);

    return [...databaseRecipes, ...apiRecipes];
};

const getRecipeById = async (id, location) => {

    if (location === 'api') {

        const apiSearch = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_ONE}`)
        ).data;

        const apiRecipe = {
            id: apiSearch.id,
            title: apiSearch.title,
            image: apiSearch.image,
            summary: apiSearch.summary,
            healthScore: apiSearch.healthScore,
            instructions: apiSearch.analyzedInstructions,
            created: false,
        }

        return apiRecipe;

    } else {
        await Recipe.findByPk(id);
    }
}

module.exports = {
    searchRecipeByName,
    getAllRecipes,
    getRecipeById,
};