const getRecipesHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const results = name
            ? await searchRecipeByName(name)
            : await getAllRecipes();

            res.status(200).json(results);

    } catch (error) {

        res.status(400).json({error: error.message});
    }
};

const getRecipeHandler = (req, res) => {
    res.send('NIY: ESTA RUTA TRAE LA INFO DE UNA RECETA DETERMINADA POR ID')
};

const createRecipeHandler = (req, res) => {
    res.send('NIY: ESTA RUTA CREA UNA NUEVA RECETA')
};


module.exports = {
    getRecipeHandler,
    getRecipesHandler,
    createRecipeHandler,
};
