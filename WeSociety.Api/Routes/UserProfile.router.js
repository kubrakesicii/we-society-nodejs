const express = require('express')
const router = express.Router({caseSensitive: false});
const UserProfileController =require("../Controllers/UserProfile.controller")

const auth = require('../Middlewares/AuthMiddleware')

router.get('/:id', UserProfileController.getById)
router.put('/:id', UserProfileController.update)




module.exports = router;