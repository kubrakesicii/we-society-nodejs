const GetArticleClapDto = (articleClapGroup) => ({
  count: articleClapGroup.length,
  userProfileId: articleClapGroup[0].UserProfile.Id,
  fullName: articleClapGroup[0].UserProfile.FullName,
  image: articleClapGroup[0].UserProfile.Image == null ? null : Buffer.from(articleClapGroup[0].UserProfile.Image).toString("base64"),
  bio: articleClapGroup[0].UserProfile.Bio,
  userName: articleClapGroup[0].UserProfile.User.UserName,
  email: articleClapGroup[0].UserProfile.User.Email,
  createdTime: articleClapGroup[0].CreatedTime,
});


module.exports = {GetArticleClapDto}