const GetUserProfileDto = (userProfile) => (
    {
        id: userProfile.Id,
        fullName:userProfile.FullName,
        email : userProfile.User.Email,
        bio : userProfile.Bio,
        image : userProfile.Image,
        github : userProfile.Github,
        linkedin : userProfile.Linkedin,
        followersCount: userProfile.Followers.length,
        followingsCount: userProfile.Followings.length
        //isFollowing eklenecek
    }
)

const GetUpdateUserDto = (userProfile) => (
    {
        id: userProfile.User.Id,
        userProfileId : userProfile.Id,
        image : userProfile.Image,
        userName : userProfile.User.UserName,
        fullName:userProfile.FullName,
        email : userProfile.User.Email
    }
)


module.exports = {GetUserProfileDto,GetUpdateUserDto}