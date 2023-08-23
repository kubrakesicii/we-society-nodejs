const ArticleService = require("../../WeSociety.Application/Services/Article.service")


module.exports = {
    insert: ArticleService.insert,
    update: ArticleService.update,
    getById: ArticleService.getById,
    getAll: ArticleService.getAll,
    getAllDrafts: ArticleService.getAllDrafts,
    getAllPopulars: ArticleService.getAllPopulars,
    getAllByUser: ArticleService.getAllByUser
}