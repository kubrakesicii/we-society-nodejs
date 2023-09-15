const { SuccessResponse, OK } = require("../../WeSociety.Application/reponses/response")
const articleClapService = require("../../WeSociety.Application/services/articleClap.service")

module.exports = {
    insert: async (req, res, next) => {
        await articleClapService.insert(req.body)
        return new SuccessResponse(res)
    },
    getAllByArticle: async (req, res, next) => {
        var data = await articleClapService.getAllByArticle(req.query.articleId)
        return new OK(res,data)
    }
}