const { Recipe } = require('../db');
const axios = require('axios');

const searchRecipeByName = async () => { };

const getAllRecipes = async () => { 

    const databaseRecipes = await Recipe.findAll();

    const apiRecipes = await axios.get()
};