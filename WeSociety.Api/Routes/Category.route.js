const express = require('express')
const CategoryController = require('../Controllers/Category.controller')
const router = express.Router();

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getById)

module.exports = router;