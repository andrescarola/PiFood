const getDiets = require('../controllers/dietsControllers');

const getDietsHandler = (req, res) => {

    try {
        const diets = getDiets()
        res.status(200).json(diets)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getDietsHandler
};
