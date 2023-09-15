const express = require('express')
const router = express.Router({caseSensitive: false});
const userController = require("../controllers/user.controller")

router.post('/Register',userController.register)
router.post('/Login',userController.login)

module.exports = router;