const express = require('express')
const router = express.Router({caseSensitive: false});
const UserController = require("../Controllers/User.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post('/Register',UserController.register)
router.post('/Login',UserController.login)




module.exports = router;