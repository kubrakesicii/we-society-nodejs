const models = (sequelize) => {
    console.log("INDEX here");

    // const models = {}

    models.Article=require('./Article.model')(sequelize);
    models.UserProfile=require('./UserProfile.model')(sequelize);
    models.ArticleClap=require('./UserProfile.model')(sequelize);
}

module.exports = models;