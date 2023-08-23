const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK,SuccessResponse} = require('../Reponses/Response')
const articleCommentMapping = require('../Mappings/ArticleComment.mapping')

module.exports = {
    insert : async (req, res, next) => {
        const data = req.body;
        await context.ArticleComment.create(data)
        return new SuccessResponse(res)   
    },

    getAllByArticle: async (req,res,next) => {
        const comments = await context.ArticleComment.findAll({
            include: ["UserProfile"], 
            where : {
                ArticleId : req.query.articleId
            }
        })

        const commentDtos = comments.map(c => articleCommentMapping.GetArticleCommentDto(c))
        return new OK(res, commentDtos)
    }
}