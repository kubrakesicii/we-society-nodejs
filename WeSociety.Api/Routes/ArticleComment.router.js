const express = require('express')
const router = express.Router({caseSensitive: false});
const articleCommentController = require("../controllers/articleComment.controller")
const auth = require('../middlewares/authMiddleware')

router.post("/",articleCommentController.insert)
router.get("/",articleCommentController.getAllByArticle)



module.exports = router;