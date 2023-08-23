const express = require('express')
const router = express.Router({caseSensitive: false});
const ArticleController = require("../Controllers/Article.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post("/", ArticleController.insert)
router.put("/:id", ArticleController.update)
router.get("/:id", ArticleController.getById)
router.get("/", ArticleController.getAll)
router.get("/Drafts", ArticleController.getAllDrafts)
router.get("/Popular", ArticleController.getAllPopulars)
router.get("/ByUser", ArticleController.getAllByUser)


module.exports = router;