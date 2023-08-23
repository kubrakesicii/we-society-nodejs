const ArticleCommentService = require("../../WeSociety.Application/Services/ArticleComment.service")

module.exports = {
    insert : ArticleCommentService.insert,
    getAllByArticle : ArticleCommentService.getAllByArticle
}