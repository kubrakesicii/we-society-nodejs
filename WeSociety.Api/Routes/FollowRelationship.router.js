const express = require('express')
const router = express.Router({caseSensitive: false});
const followRelationshipController = require("../controllers/followRelationship.controller")
const auth = require('../middlewares/authMiddleware')
const paginationMidd = require('../middlewares/paginationMiddleware')

router.post("/Follow", followRelationshipController.follow)
router.post("/UnFollow", followRelationshipController.unfollow)
router.get("/Followers", paginationMidd,followRelationshipController.getAllFollowers)
router.get("/Followings",paginationMidd, followRelationshipController.getAllFollowings)
router.get("/IsFollow", followRelationshipController.getIsFollow)



module.exports = router;