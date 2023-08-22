const tedious = require('tedious');
const { Sequelize } = require('sequelize');
const config = require('./config');
const models = require('../../WeSociety.Domain/Models/index')

module.exports = dbContext = {}

const InitializeDbContext = async () => {
    const dialect = 'mssql';
    const host = config.server;
    const { userName, password } = config.authentication.options;
    // Connect to db
    const sequelize = new Sequelize(config.database, userName, password, {host,dialect})

    // Init models and add them to the exported db object
    const Article=require('../../WeSociety.Domain/Models/Article.model')(sequelize);
    const Category=require('../../WeSociety.Domain/Models/Category.model')(sequelize);
    const UserProfile=require('../../WeSociety.Domain/Models/UserProfile.model')(sequelize);
    const AspNetUser=require('../../WeSociety.Domain/Models/AspNetUser.model')(sequelize);
    const ArticleClap=require('../../WeSociety.Domain/Models/ArticleClap.model')(sequelize);
    const ArticleComment=require('../../WeSociety.Domain/Models/ArticleComment.model')(sequelize);
    const FollowRelationship=require('../../WeSociety.Domain/Models/FollowRelationship.model')(sequelize);
    const ReadingList=require('../../WeSociety.Domain/Models/ReadingList.model')(sequelize);
    const ReadingListArticle=require('../../WeSociety.Domain/Models/ReadingListArticle.model')(sequelize);

    dbContext.Article=Article;
    dbContext.Category=Category;
    dbContext.UserProfile=UserProfile;
    dbContext.AspNetUser=AspNetUser;
    dbContext.ArticleClap=ArticleClap;
    dbContext.ArticleComment=ArticleComment;
    dbContext.FollowRelationship=FollowRelationship;
    dbContext.ReadingList=ReadingList;
    dbContext.ReadingListArticle=ReadingListArticle;

    console.log("HERE DB CTX");

    Article.associate(dbContext)
    Category.associate(dbContext)
    ArticleClap.associate(dbContext)
    ArticleComment.associate(dbContext)
    UserProfile.associate(dbContext)
    FollowRelationship.associate(dbContext)
    ReadingList.associate(dbContext)
    ReadingListArticle.associate(dbContext)



    // articles.belongsTo(userProfiles, {foreignKey: 'UserProfileId', as : 'UserProfile'})


    //Sync all models with db
    // await sequelize.sync({})

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

InitializeDbContext()
