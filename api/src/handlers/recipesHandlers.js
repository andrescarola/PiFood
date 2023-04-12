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
    const location = isNaN(id) ? 'db' : 'api';

    try {
        const recipe = await getRecipeById(id, location);
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const createRecipeHandler = (req, res) => {
    const { title, image, summary, healthScore, instructions } = req.body

    try {
        const newRecipe = createRecipe(title, image, summary, healthScore, instructions);
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


module.exports = {
    getRecipeHandler,
    getRecipesHandler,
    createRecipeHandler,
};
