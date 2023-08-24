const express = require('express')
const router = express.Router({caseSensitive: false});
const ReadingListArticleController = require("../Controllers/ReadingListArticle.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post("/", ReadingListArticleController.insert)
router.get("/", ReadingListArticleController.getArticlesByList)
router.get("/IsSaved", ReadingListArticleController.getIsSaved)
router.delete("/:id", ReadingListArticleController.remove)



module.exports = router;