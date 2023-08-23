const express = require('express')
const router = express.Router({caseSensitive: false});
const ArticleCommentController = require("../Controllers/ArticleComment.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post("/",ArticleCommentController.insert)
router.get("/",ArticleCommentController.getAllByArticle)



module.exports = router;