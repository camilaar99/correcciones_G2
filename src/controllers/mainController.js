const fs = require('fs');
const path = require('path');


let db=require('../database/models');
let sequelize=db.sequelize

const mainController = {


    mainView: function (req, res) {

        try {
            db.Product.findAll({
                where:{
                    size:"Small"
                }
            }).then(function (result) {
                res.render('shop', { products: result })
                //res.send(result)
            })
            
        } catch (error) {
            res.send(error)
        }
        
    }
}

module.exports = mainController