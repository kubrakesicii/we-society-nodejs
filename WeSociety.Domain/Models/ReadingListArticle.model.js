const sequelize = require("sequelize");
const { Model,DataTypes } = require("sequelize");
require('sequelize');

module.exports = (sequelize) => {
    class ReadingListArticle extends Model{
        static associate = (models) => {

        }
    }

    const attributes = {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ReadingListId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ReadingLists',
                key: 'Id'
            }
        },
        ArticleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Articles',
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

    ReadingListArticle.init(attributes, {
        sequelize,
        modelName:"ReadingListArticle",
        timestamps: false,
    })
    return ReadingListArticle;
}