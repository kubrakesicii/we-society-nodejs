const GetUserProfileDto = (userProfile) => (
    {
        id: userProfile.Id,
        fullName:userProfile.FullName,
        email : userProfile.User.Email,
        bio : userProfile.Bio,
        image : userProfile.Image == null ? null :Buffer.from(userProfile.Image).toString('base64'),
        github : userProfile.Github,
        linkedin : userProfile.Linkedin,
        followersCount: userProfile.Followers != null ? userProfile.Followers.length : 0,
        followingsCount: userProfile.Followings != null ? userProfile.Followings.length : 0
        //isFollowing eklenecek
    }
)

const GetUpdateUserDto = (userProfile) => (
    {
        id: userProfile.User.Id,
        userProfileId : userProfile.Id,
        image : userProfile.Image == null ? null :Buffer.from(userProfile.Image).toString('base64'),
        userName : userProfile.User.UserName,
        fullName:userProfile.FullName,
        email : userProfile.User.Email
    }
)


module.exports = {GetUserProfileDto,GetUpdateUserDto}