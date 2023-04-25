const arrayMapper = (arr) =>
    arr.map((elem) => {

        const diets = elem.diets.map(diet => diet);
        if (elem.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian');
        if (elem.vegan && !diets.includes('vegan')) diets.push('vegan');
        if (elem.glutenFree && !diets.includes('gluten free')) diets.push('gluten free');


        return {
            id: elem.id,
            title: elem.title,
            image: elem.image,
            summary: elem.summary.replace(/<.*?>/g, ''),
            healthScore: elem.healthScore,
            instructions: elem.analyzedInstructions,
            diets: diets,
            created: false,
        }
    });

const dietsArrayMapper = (arr) =>
    arr.map((elem) => {

        const diets = elem.diets.map(diet => diet);
        if (elem.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian');
        if (elem.vegan && !diets.includes('vegan')) diets.push('vegan');
        if (elem.glutenFree && !diets.includes('gluten free')) diets.push('gluten free');


        return diets

    });

module.exports = {
    arrayMapper,
    dietsArrayMapper
}
