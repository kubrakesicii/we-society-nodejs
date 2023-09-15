const { OK, SuccessResponse } = require("../../WeSociety.Application/reponses/response")
const readingListArticleService = require("../../WeSociety.Application/services/readingListArticle.service")

module.exports = {
    insert : async (req,res,next) => {
        await readingListArticleService.insert(req.body)
        return new SuccessResponse(res)
    },
    getArticlesByList : async (req,res,next) => {
        var data = await readingListArticleService.getArticlesByList(req.query.readingListId)
        return new OK(res,data)
    },
    getIsSaved :  async (req,res,next) => {
        var data = await readingListArticleService.getIsSaved(req.query.articleId,req.query.userProfileId)
        return new OK(res,data)
    },
    remove :  async (req,res,next) => {
        try{
            await readingListArticleService.removeSaved(req.params.id)
            return new SuccessResponse(res)
        }
        catch(err){
            next(err)
        }
    }
}