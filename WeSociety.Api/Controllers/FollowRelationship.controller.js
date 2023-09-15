const { OK, SuccessResponse } = require("../../WeSociety.Application/reponses/response")
const followRelationshipService = require("../../WeSociety.Application/services/followRelationship.service")


module.exports = {
    follow : async (req,res,next) => {
        await followRelationshipService.follow(req.body)
        return new SuccessResponse(res);
    },
    unfollow : async (req,res,next) => {
        await followRelationshipService.unfollow(req.body)
        return new SuccessResponse(res);
    },
    getAllFollowers : async (req,res,next) => {
        var data = await followRelationshipService.getAllFollowers(req.query.pageIndex, req.query.pageSize, req.query.userProfileId)
        return new OK(res,data)
    },
    getAllFollowings :  async (req,res,next) => {
        var data = await followRelationshipService.getAllFollowings(req.query.pageIndex, req.query.pageSize, req.query.userProfileId)
        return new OK(res,data)
    },
    getIsFollow : async (req,res,next) => {
        var data = followRelationshipService.getIsFollow(req.query.followerId, req.query.followingId)
        return new OK(res,data)
    }
}