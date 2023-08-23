const express = require('express')
const router = express.Router({caseSensitive: false});
const ReadingListController = require("../Controllers/ReadingList.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post("/", ReadingListController.insert)
router.get("/", ReadingListController.getAllByUser)



module.exports = router;