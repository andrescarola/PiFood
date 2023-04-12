const arrayMapper = (arr) => 
    arr.map((elem) => {
        return {
            id: elem.id,
            title: elem.title,
            image: elem.image,
            summary: elem.summary,
            healthScore: elem.healthScore,
            instructions: elem.analyzedInstructions,
            diets: elem.diets,
            created: false,
        }
    });

module.exports = arrayMapper;