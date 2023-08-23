const GetArticleDto = (article) => (
    {
        id: article.Id,
        title:article.Title,
        domain : article.Domain,
        content : article.Content,
        mainImage : article.MainImage,
        createdTime : article.CreatedTime,
        updatedTime : article.UpdatedTime,
        clapCount : article.Claps.length,
        commentCount : article.Comments.length
    }
)


module.exports = {GetArticleDto}