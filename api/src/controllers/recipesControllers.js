const { Recipe, Diet } = require('../db');
const axios = require('axios');
const {arrayMapper} = require('../utils/arrayMapper');
const { API_KEY_ONE } = process.env;

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

    const dbinfo = databaseRecipes.map(elem => {
        return {
            id: elem.id,
            title: elem.title,
            image: elem.image,
            summary: elem.summary,
            healthScore: elem.healthScore,
            instructions: elem.instructions,
            diets: elem.diets.map(el => el.name),
            created: elem.created
        }
    })

    const apiRecipesImport = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`)
    ).data.results;

    const apiRecipes = arrayMapper(apiRecipesImport);

    return [...dbinfo, ...apiRecipes];
};

const searchRecipeByName = async (title) => {
    const allRecipes = await getAllRecipes();

    if (title) {
        const recipesFiltered = allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(title.toLowerCase()));
        if (recipesFiltered.length === 0) {
            throw Error(`No recipes have been found that match your search: '${title}'`)
        } else {
            return recipesFiltered;
        }
    } else {
        return allRecipes
    }
};

const getRecipeById = async (id) => {
    const allRecipes = await getAllRecipes();
    const recipe = allRecipes.filter(el => el.id == id)

    if (recipe.length === 0) {
        throw Error(`No recipe has been found that matches the id: ${id}`)
    } else {
        return recipe;
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