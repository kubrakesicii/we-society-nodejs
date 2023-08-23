const express = require('express')
const router = express.Router({caseSensitive: false});
const ArticleClapController = require("../Controllers/ArticleClap.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post("/", ArticleClapController.insert)
router.get("/", ArticleClapController.getAllByArticle)


module.exports = router;