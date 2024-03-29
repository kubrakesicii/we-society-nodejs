const { Sequelize } = require("sequelize");
const config = require("./config");

module.exports = dbContext = {};

const InitializeDbContext = async () => {
  const dialect = "mssql";
  const host = config.server;
  const { userName, password } = config.authentication.options;
  // Connect to db
  const sequelize = new Sequelize(config.database, userName, password, {
    host,
    dialect,
  });

  dbContext.conn = sequelize;

  // Init models and add them to the exported db object
  const Article = require("../../WeSociety.Domain/models/article.model")(
    sequelize
  );
  const Category = require("../../WeSociety.Domain/models/category.model")(
    sequelize
  );
  const UserProfile =
    require("../../WeSociety.Domain/models/userProfile.model")(sequelize);
  const AspNetUser = require("../../WeSociety.Domain/models/aspNetUser.model")(
    sequelize
  );
  const ArticleClap =
    require("../../WeSociety.Domain/models/articleClap.model")(sequelize);
  const ArticleComment =
    require("../../WeSociety.Domain/models/articleComment.model")(sequelize);
  const FollowRelationship =
    require("../../WeSociety.Domain/models/followRelationship.model")(
      sequelize
    );
  const ReadingList =
    require("../../WeSociety.Domain/models/readingList.model")(sequelize);
  const ReadingListArticle =
    require("../../WeSociety.Domain/models/readingListArticle.model")(
      sequelize
    );

  dbContext.Article = Article;
  dbContext.Category = Category;
  dbContext.UserProfile = UserProfile;
  dbContext.AspNetUser = AspNetUser;
  dbContext.ArticleClap = ArticleClap;
  dbContext.ArticleComment = ArticleComment;
  dbContext.FollowRelationship = FollowRelationship;
  dbContext.ReadingList = ReadingList;
  dbContext.ReadingListArticle = ReadingListArticle;

  Article.associate(dbContext);
  Category.associate(dbContext);
  ArticleClap.associate(dbContext);
  ArticleComment.associate(dbContext);
  UserProfile.associate(dbContext);
  FollowRelationship.associate(dbContext);
  ReadingList.associate(dbContext);
  ReadingListArticle.associate(dbContext);

  //Sync all models with db
  // await sequelize.sync({})

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

InitializeDbContext();
