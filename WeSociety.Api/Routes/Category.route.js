const express = require('express')
const CategoryController = require('../Controllers/Category.controller')
const router = express.Router();

router.get('/', CategoryController.getAll)

module.exports = router;