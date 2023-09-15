const categoryRouter = require('./category.router')
const articleRouter = require('./article.router')
const articleClapRouter = require('./articleClap.router')
const articleCommentRouter = require('./articleComment.router')
const followRelationshipRouter = require('./followRelationship.router')
const readingListRouter = require('./readingList.router')
const readingListarticleRouter = require('./readingListArticle.router')
const userRouter = require('./user.router')
const userProfileRouter = require('./userProfile.router')


module.exports = (app) => {
    app.use('/Categories', categoryRouter);
    app.use('/Articles', articleRouter);
    app.use('/ArticleClaps', articleClapRouter);
    app.use('/ArticleComments', articleCommentRouter);
    app.use('/FollowRelationships', followRelationshipRouter);
    app.use('/ReadingLists', readingListRouter);
    app.use('/ReadingListArticles', readingListarticleRouter);
    app.use('/Auth', userRouter);
    app.use('/UserProfiles', userProfileRouter);
}