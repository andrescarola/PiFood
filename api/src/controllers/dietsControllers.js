const { Diet } = require('../db');
const axios = require('axios');
const { API_KEY_ONE } = process.env;
const { dietsArrayMapper } = require ('../utils/arrayMapper');

const getDiets = async () => {

    const apiDiets = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_ONE}&addRecipeInformation=true&instructionsRequired=true&number=100`)
    ).data.results;

    const diets = dietsArrayMapper(apiDiets).flat()

    // const diets = apiDiets.map(el => el.diets).flat() //me devuelve un arreglo con los arreglos de dietas y luego unifica a un solo arreglo.

    diets.forEach(el => {
        Diet.findOrCreate({
            where: { name: el }
        })
    });

    const allDiets = await Diet.findAll();
    return allDiets;
};

module.exports = getDiets;