const { searchRecipeByName, getAllRecipes, getRecipeById, createRecipe } = require('../controllers/recipesControllers')

const getRecipesHandler = async (req, res) => {
    const { title } = req.query;
    try {
        const results = title
            ? await searchRecipeByName(title)
            : await getAllRecipes();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRecipeHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await getRecipeById(id);
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const createRecipeHandler = async (req, res) => {
    const { title, image, summary, healthScore, instructions, created, diets } = req.body

    try {
        if(!title|| !summary || !image || !instructions || !healthScore) {
        res.status(400).send('Please check that you have completed all the required fields')
    } else {const newRecipe = await createRecipe(title, image, summary, healthScore, instructions, created, diets);
        res.status(200).send('Congratulations! Your recipe has been created!')}
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


module.exports = {
    getRecipeHandler,
    getRecipesHandler,
    createRecipeHandler,
};
