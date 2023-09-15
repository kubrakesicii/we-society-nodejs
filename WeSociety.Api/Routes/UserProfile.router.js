const express = require('express')
const router = express.Router({caseSensitive: false});
const userProfileController =require("../controllers/userProfile.controller")
const auth = require('../middlewares/authMiddleware')

router.get('/:id', userProfileController.getById)
router.put('/:id', userProfileController.update)

module.exports = router;