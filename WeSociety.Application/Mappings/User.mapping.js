

const GetUserDto = (user) => ({
    Id : user.Id,
    UserName : user.UserName,
    Email : user.Email
});

const GetLoginUserDto = (userProfile, token) => (
    {
        token,
        id: userProfile.User.Id,
        userProfileId : userProfile.Id,
        image : userProfile.Image,
        userName : userProfile.User.UserName,
        fullName:userProfile.FullName,
        email : userProfile.User.Email
    }
)

module.exports = {GetUserDto,GetLoginUserDto}