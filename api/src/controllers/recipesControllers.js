const { Recipe } = require('../db');
const axios = require('axios');
const {API_KEY_ONE} = process.env;

const searchRecipeByName = async () => { };

const getAllRecipes = async () => { 

    const databaseRecipes = await Recipe.findAll();

    const apiRecipesImport = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`);

};