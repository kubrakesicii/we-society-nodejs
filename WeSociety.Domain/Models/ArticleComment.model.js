const sequelize = require("sequelize");
const { Model,DataTypes } = require("sequelize");
require('sequelize');


module.exports = (sequelize) => {
    class ArticleComment extends Model{
        static associate = (models) => {            
            ArticleComment.belongsTo(models.Article, {foreignKey: 'ArticleId', as : 'Article'})
            ArticleComment.belongsTo(models.UserProfile, {foreignKey: 'UserProfileId', as : 'UserProfile'})
        };
    }

    const attributes = {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ArticleId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        IsActive: { type: DataTypes.TINYINT, default: 1 },
    }

    ArticleComment.init(attributes, {
        sequelize,
        modelName:'ArticleComment',
        timestamps: false
    });
    return ArticleComment;
}