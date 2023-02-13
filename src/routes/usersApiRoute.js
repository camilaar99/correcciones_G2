const express = require('express')
const router = express.Router()
const usersApiController = require('../controllers/usersApiController')

router.get('/', usersApiController.all)
router.get('/:id', usersApiController.detail)

module.exports = router;