const db = require('../database/models');
const sequelize = db.sequelize;

const mainController = {
    mainView: async (req, res) => {
        try {
            const result = await db.Product.findAll({ where: { size: 'Small' } });
            res.render('shop', { products: result });
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = mainController;