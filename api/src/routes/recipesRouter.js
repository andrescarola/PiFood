const { Router } = require('express');
const { getRecipeHandler, getRecipesHandler, createRecipeHandler } = require('../handlers/recipesHandlers');

const recipesRouter = Router();

recipesRouter.get('/', getRecipesHandler);

recipesRouter.get('/:id', getRecipeHandler);

recipesRouter.post('/', createRecipeHandler);


module.exports = recipesRouter;