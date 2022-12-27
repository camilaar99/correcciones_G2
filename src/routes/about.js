var express = require('express');
var router = express.Router();
const path=require('path')
const aboutController=require('../controllers/aboutController')

/* GET home page. */
router.get('/', aboutController.aboutView);

module.exports = router;
