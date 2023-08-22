const CategoryRouter = require('./Category.router')
const ArticleRouter = require('./Article.router')
const ArticleClapRouter = require('./ArticleClap.router')
const ArticleCommentRouter = require('./ArticleComment.router')
const FollowRelationshipRouter = require('./FollowRelationship.router')
const ReadingListRouter = require('./ReadingList.router')
const ReadingListArticleRouter = require('./ReadingListArticle.router')
const UserRouter = require('./User.router')
const UserProfileRouter = require('./UserProfile.router')


module.exports = (app) => {
    app.use('/Categories', CategoryRouter);
    app.use('/Articles', ArticleRouter);
    app.use('/ArticleClaps', ArticleClapRouter);
    app.use('/ArticleComments', ArticleCommentRouter);
    app.use('/FollowRelationships', FollowRelationshipRouter);
    app.use('/ReadingLists', ReadingListRouter);
    app.use('/ReadingListArticles', ReadingListArticleRouter);
    app.use('/Auth', UserRouter);
    app.use('/UserProfiles', UserProfileRouter);
}