const express = require('express')
const router = express.Router()
const productsApiController = require('../controllers/productsApiController')

router.get('/', productsApiController.all)
router.get('/p', productsApiController.all2)
router.get('/:id', productsApiController.detail)


module.exports = router;