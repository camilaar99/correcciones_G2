var express = require('express');
var router = express.Router();
const path=require('path')
const cartController=require('../controllers/cartController')

/* GET home page. */
router.get('/', cartController.cartView);

module.exports = router;
