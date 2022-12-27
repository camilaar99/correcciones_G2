const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController={
    mainView: function(req, res, next) {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('shop')}
}

module.exports=mainController