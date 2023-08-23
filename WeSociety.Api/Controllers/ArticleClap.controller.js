const ArticleClapService = require("../../WeSociety.Application/Services/ArticleClap.service")

module.exports = {
    insert: ArticleClapService.insert,
    getAllByArticle: ArticleClapService.getAllByArticle
}