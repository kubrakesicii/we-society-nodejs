const { SuccessResponse } = require("../../WeSociety.Application/reponses/response")
const articleCommentService = require("../../WeSociety.Application/services/articleComment.service")

module.exports = {
    insert: async (req, res, next) => {
        await articleCommentService.insert(req.body)
        return new SuccessResponse(res)
    },    
    getAllByArticle: async (req, res, next) => {
        var data = await articleCommentService.getAllByArticle(req.query.articleId)
        return new OK(res,data)
    }}