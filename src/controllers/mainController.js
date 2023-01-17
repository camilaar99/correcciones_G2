const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let db=require('../database/models');
let sequelize=db.sequelize

const mainController = {
    // mainView: function (req, res, next) {
    //     products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    //     res.render('shop', { products })
    // },

    mainView: function (req, res) {

        try {
            db.Product.findAll().then(function (result) {
                res.render('shop', { products: result })
                //res.send(result)
            })
            
        } catch (error) {
            res.send(error)
        }
        
    }
}

module.exports = mainController