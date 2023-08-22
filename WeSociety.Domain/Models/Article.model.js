const { Model,DataTypes } = require("sequelize");

module.exports = (sequelize,) => {
    class Article extends Model{
        static associate = (models) => {            
            Article.belongsTo(models.UserProfile, {foreignKey: 'UserProfileId', as : 'UserProfile'})
            Article.belongsTo(models.Category, {foreignKey: 'CategoryId', as : 'Category'})
            Article.hasMany(models.ArticleClap, {as:'ArticleClaps'})
            Article.hasMany(models.ArticleComment, {as:'ArticleComments'})

            Article.hasMany(models.ReadingListArticle, {as:'ReadingLists', foreignKey:'ArticleId'})

        };
    }

    const attributes = {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Domain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsPublished: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        ViewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        MainImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        UserProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserProfiles',
                key: 'Id'
            }
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'Id'
            }
        },
        CreatedTime: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
          },
          UpdatedTime: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
          },
        IsActive: { type: DataTypes.TINYINT, default: 1 }
    }
    Article.init(attributes, {
        sequelize,
        modelName:'Article',
        timestamps: false
    });
    return Article;
}
