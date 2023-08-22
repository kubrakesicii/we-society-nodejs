const sequelize = require("sequelize");
const { Model,DataTypes } = require("sequelize");
require('sequelize');

module.exports = (sequelize) => {
    class ArticleClap extends Model{
        static associate = (models) => {            
            ArticleClap.belongsTo(models.Article, {foreignKey: 'ArticleId', as : 'Article'})
            ArticleClap.belongsTo(models.UserProfile, {foreignKey: 'UserProfileId', as : 'UserProfile'})
        };
    }

    const attributes = {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        IsActive: { type: DataTypes.TINYINT, default: 1 }
    }

    ArticleClap.init(attributes, {
        sequelize,
        modelName:'ArticleClap',
        timestamps: false
    });
    return ArticleClap;
}
