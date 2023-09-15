const express = require('express')
const router = express.Router({caseSensitive: false});
const articleController = require("../controllers/article.controller")
const auth = require('../middlewares/authMiddleware')
const paginationMidd = require('../middlewares/paginationMiddleware')

router.post("/", articleController.insert)
router.put("/:id", articleController.update)
router.get("/Drafts",paginationMidd, articleController.getAllDrafts)
router.get("/Popular", articleController.getAllPopulars)
router.get("/ByUser",paginationMidd, articleController.getAllByUser)
router.get("/:id", articleController.getById)
router.get("/", paginationMidd,articleController.getAll)


module.exports = router;