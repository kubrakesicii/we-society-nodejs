const ReadingListArticleController = require("../../WeSociety.Application/Services/ReadingListArticle.service")

module.exports = {
    insert : ReadingListArticleController.insert,
    getArticlesByList : ReadingListArticleController.getArticlesByList,
    getIsSaved : ReadingListArticleController.getIsSaved,
    remove : ReadingListArticleController.removeSaved
}