const express = require('express')
const router = express.Router({caseSensitive: false});
const readingListController = require("../controllers/readingList.controller")
const auth = require('../middlewares/authMiddleware')

router.post("/", readingListController.insert)
router.get("/", readingListController.getAllByUser)



module.exports = router;