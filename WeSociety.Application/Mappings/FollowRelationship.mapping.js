
const GetFollowerDto = (followRel) => (
    {
        id: followRel.Id,
        userProfileId:followRel.Follower.Id,
        fullName : followRel.Follower.FullName,
        image : followRel.Follower.Image == null ? null : Buffer.from(followRel.Follower.Image).toString('base64'),
        bio : followRel.Follower.Bio,
        userName : followRel.Follower.User.UserName,
        email : followRel.Follower.User.Email,
        createdTime: followRel.CreatedTime
    }
)

const GetFollowingDto = (followRel) => (
    {
        id: followRel.Id,
        userProfileId:followRel.Following.Id,
        fullName : followRel.Following.FullName,
        image : followRel.Following.Image == null ? null : Buffer.from(followRel.Following.Image).toString('base64'),
        bio : followRel.Following.Bio,
        userName : followRel.Following.User.UserName,
        email : followRel.Following.User.Email,
        createdTime: followRel.CreatedTime
    }
)



module.exports = {GetFollowerDto,GetFollowingDto}