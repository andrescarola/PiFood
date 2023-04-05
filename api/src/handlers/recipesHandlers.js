const getRecipesHandler = (req, res) => {
    res.send('NIY: ESTA RUTA TRAE LA INFO TODAS LAS RECETAS O POR QUERY')
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
