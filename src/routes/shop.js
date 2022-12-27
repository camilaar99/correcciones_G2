var express = require('express');
var router = express.Router();
const path=require('path')
const shopController=require('../controllers/shopController')

/* GET home page. */
router.get('/', shopController.shopView);

module.exports = router;
