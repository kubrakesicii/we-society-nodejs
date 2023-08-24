

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
        image : Buffer.from(userProfile.Image).toString('base64'),
        userName : userProfile.User.UserName,
        fullName:userProfile.FullName,
        email : userProfile.User.Email
    }
)

module.exports = {GetUserDto,GetLoginUserDto}