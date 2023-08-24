const GetArticleDto = (article) => (
    {
        id: article.Id,
        title:article.Title,
        domain : article.Domain,
        content : article.Content,
        mainImage : article.MainImage == null ? null : Buffer.from(article.MainImage).toString('base64'),
        createdTime : article.CreatedTime,
        updatedTime : article.UpdatedTime,
        clapCount: article.Claps != null ? article.Claps.length : 0,
        commentCount: article.Comments != null ? article.Comments.length : 0
    }
)


module.exports = {GetArticleDto}