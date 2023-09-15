const context = require('../../WeSociety.Persistence/context/dbContext')
const articleCommentMapping = require('../mappings/articleComment.mapping')

module.exports = {
    insert : async (data) => {
        await context.ArticleComment.create(data)
    },

    getAllByArticle: async (articleId) => {
        const comments = await context.ArticleComment.findAll({
            include: ["UserProfile"], 
            where : {
                ArticleId : articleId
            }
        })

        const commentDtos = comments.map(c => articleCommentMapping.GetArticleCommentDto(c))
        return commentDtos;
    }
}