var express = require('express');
var router = express.Router();
const path=require('path')
const mainController=require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.mainView);

module.exports = router;
