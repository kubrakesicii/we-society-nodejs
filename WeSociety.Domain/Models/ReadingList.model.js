const { Model,DataTypes } = require("sequelize");
require('sequelize');


module.exports = (sequelize) => {
    class ReadingList extends Model{
        static associate = (models) => {
            ReadingList.belongsTo(models.UserProfile, {foreignKey: 'UserProfileId', as : 'UserProfile'})
            ReadingList.hasMany(models.ReadingListArticle, {as:'Articles', foreignKey:'ReadingListId'})
        }
    }

    const attributes = {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserProfiles',
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

    ReadingList.init(attributes, {
        sequelize,
        modelName:"ReadingList",
        timestamps: false,
    })
    return ReadingList;
}
