const express = require('express')
const router = express.Router({caseSensitive: false});
const readingListArticleController = require("../controllers/readingListArticle.controller")
const auth = require('../middlewares/authMiddleware')

router.post("/", readingListArticleController.insert)
router.get("/", readingListArticleController.getArticlesByList)
router.get("/IsSaved", readingListArticleController.getIsSaved)
router.delete("/:id", readingListArticleController.remove)



module.exports = router;