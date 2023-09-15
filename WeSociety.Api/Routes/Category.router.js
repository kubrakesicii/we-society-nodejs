const express = require('express')
const categoryController = require('../controllers/category.controller')
const router = express.Router({caseSensitive: false});
const auth = require('../middlewares/authMiddleware')


router.post('/', auth,categoryController.insert)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getById)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router;