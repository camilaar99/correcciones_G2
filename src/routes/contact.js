var express = require('express');
var router = express.Router();
const path=require('path')
const contactController=require('../controllers/contactController')

/* GET home page. */
router.get('/', contactController.contactView);

module.exports = router;
