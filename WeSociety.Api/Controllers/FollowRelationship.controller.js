const FollowRelationshipService = require("../../WeSociety.Application/Services/FollowRelationship.service")


module.exports = {
    follow : FollowRelationshipService.follow,
    unfollow : FollowRelationshipService.unfollow,
    getAllFollowers : FollowRelationshipService.getAllFollowers,
    getAllFollowings : FollowRelationshipService.getAllFollowings,
    getIsFollow : FollowRelationshipService.getIsFollow
}