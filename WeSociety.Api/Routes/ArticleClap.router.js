const express = require('express')
const router = express.Router({caseSensitive: false});
const articleClapController = require("../controllers/articleClap.controller")
const auth = require('../middlewares/authMiddleware')

router.post("/", articleClapController.insert)
router.get("/", articleClapController.getAllByArticle)


module.exports = router;