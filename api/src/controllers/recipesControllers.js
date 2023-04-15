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
    const databaseRecipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [], // comprobación
            }
        }
    });

    const apiRecipesImport = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`)
    ).data.results;

    const apiRecipes = arrayMapper(apiRecipesImport);

    return [...databaseRecipes, ...apiRecipes];
};

const getRecipeById = async (id) => {
    const allRecipes = await getAllRecipes()
    const recipe = allRecipes.filter(el => el.id == id)
    return recipe;
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