const express = require('express')
const router = express.Router({caseSensitive: false});
const FollowRelationshipController = require("../Controllers/FollowRelationship.controller")
const auth = require('../Middlewares/AuthMiddleware')

router.post("/Follow", FollowRelationshipController.follow)
router.post("/UnFollow", FollowRelationshipController.unfollow)
router.get("/Followers", FollowRelationshipController.getAllFollowers)
router.get("/Followings", FollowRelationshipController.getAllFollowings)
router.get("/IsFollow", FollowRelationshipController.getIsFollow)



module.exports = router;