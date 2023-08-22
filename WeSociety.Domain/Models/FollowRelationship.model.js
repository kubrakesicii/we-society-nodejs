const sequelize = require("sequelize");
const { Model,DataTypes } = require("sequelize");
require('sequelize');


module.exports = (sequelize) => {
    class FollowRelationship extends Model{
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
        FollowerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserProfiles',
                key: 'Id'
            }
        },
        FollowingId: {
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

    FollowRelationship.init(attributes, {
        sequelize,
        modelName:'FollowRelationship',
        timestamps: false,
    })
    return FollowRelationship;
}
