const express = require('express')
const CategoryController = require('../Controllers/Category.controller')
const router = express.Router({caseSensitive: false});
const auth = require('../Middlewares/AuthMiddleware')


router.post('/', auth,CategoryController.insert)
router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getById)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router;