const GetArticleCommentDto = (articleComment) => (
    {
        id: articleComment.Id,
        text:articleComment.Text,
        userProfile : {
            id: articleComment.UserProfile.Id,
            fullName: articleComment.UserProfile.FullName,
            image: articleComment.UserProfile.Image,
        },
        createdTime: articleComment.CreatedTime
    }
)


module.exports = {GetArticleCommentDto}