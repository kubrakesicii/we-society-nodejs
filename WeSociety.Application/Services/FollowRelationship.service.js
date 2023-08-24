const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK, SuccessResponse} = require('../Reponses/Response')
const {NotfoundError, UnauthorizedError} = require('../Errors/ErrorResponse')
const followRelMapping = require("../Mappings/FollowRelationship.mapping")

module.exports = {
    getAllFollowers : async (req,res,next) => {
        const followers = await context.FollowRelationship.findAndCountAll({
            include:[
                { association: 'Follower', include:["User"]}],
            where: {FollowingId : req.query.userProfileId},
            limit:req.query.pageSize == null ? 10 : parseInt(req.query.pageSize),
            offset: req.query.pageIndex == null ? 0 : parseInt(req.query.pageIndex),
            distinct:true
        })

        const followerDtos = followers.rows.map(f => followRelMapping.GetFollowerDto(f))
        return new OK(res,{count:followers.count, items:followerDtos})
    },

    getAllFollowings : async (req,res,next) => {
        const followings = await context.FollowRelationship.findAndCountAll({
            include:[
                { association: 'Following', include:["User"]}],
            where: {FollowerId : req.query.userProfileId},
            limit:req.query.pageSize == null ? 10 : parseInt(req.query.pageSize),
            offset: req.query.pageIndex == null ? 0 : parseInt(req.query.pageIndex),
            distinct:true
        })

        const followingDtos = followings.rows.map(f => followRelMapping.GetFollowingDto(f))
        return new OK(res,{count:followings.count, items:followingDtos})
    },

    getIsFollow : async (req,res,next) => {
        const isFollow = await context.FollowRelationship.findOne({
            where: {
                FollowerId : parseInt(req.query.followerId),
                FollowingId : parseInt(req.query.followingId)
            }
        })
        if(isFollow != null) return new OK(res, true)
        return new OK(res, false)
    },

    follow : async (req,res,next) => {
        const data = req.body;
        await context.FollowRelationship.create(data)
        return new SuccessResponse(res)
    },

    unfollow : async (req,res,next) => {
        const data = req.body;
        const affectedRows = await context.FollowRelationship.destroy({
            where : {
                FollowerId : data.FollowerId,
                FollowingId : data.FollowingId           
            }
        })
        if(affectedRows == 0) return next(new NotfoundError(res))
        return new SuccessResponse(res)
    }
}