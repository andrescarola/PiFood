const { Recipe, Diet } = require('../db');
const axios = require('axios');
const arrayMapper = require('../utils/arrayMapper');
const { API_KEY_ONE } = process.env;

const searchRecipeByName = async (title) => {
    const databaseRecipes = await Recipe.findAll({ where: { title: title } });

    const apiRecipesImport = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`)
    ).data.results;

    const apiRecipes = arrayMapper(apiRecipesImport);

    const apiRecipesFiltered = await apiRecipes.filter((recipe) => recipe.title.toLowerCase().includes(title.toLowerCase()));

    if (databaseRecipes.length === 0 && apiRecipesFiltered.length === 0) {
        throw Error(`No recipes have been found that matches your search: '${title}'`)
    } else {
        return [...databaseRecipes, ...apiRecipesFiltered];
    }
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
            diets: apiSearch.diets,
            created: false,
        }
        return apiRecipe;
    } else {
        await Recipe.findByPk(id), {
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [], // comprobación
                }
            }
        }
    }
};

const createRecipe = async (title, image, summary, healthScore, instructions, created, diets) => {

    const newRecipe = await Recipe.create({ 
        title, 
        image, 
        summary, 
        healthScore, 
        instructions,
        created 
    });

    const dietsDb = await Diet.findAll({
        where: { name: diets }
    });

    newRecipe.addDiet(dietsDb);

    return newRecipe;
};

module.exports = {
    searchRecipeByName,
    getAllRecipes,
    getRecipeById,
    createRecipe,
};