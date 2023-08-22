const { Model,DataTypes } = require("sequelize");
class UserProfile extends Model{}

module.exports = (sequelize) => {
    class UserProfile extends Model{
        static associate = (models) => {            
            UserProfile.hasMany(models.Article, {as : 'Articles'})
            UserProfile.belongsTo(models.AspNetUser, {as : 'User'})

            UserProfile.hasMany(models.FollowRelationship, {as:'Followers', foreignKey:'FollowingId'})
            UserProfile.hasMany(models.FollowRelationship, {as:'Followings', foreignKey:'FollowerId'})
        };
    }
    const attributes = {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        FullName: {
            type: DataTypes.STRING,  //STRING default allows 0-2555 length
            allowNull: true,

        },
        Bio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Github: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Linkedin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        UserId: {
            type: DataTypes.STRING,
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
        IsActive: { type: DataTypes.TINYINT, defaultValue: 1 },
    }

    UserProfile.init(attributes, {
        sequelize,
        modelName:'UserProfile',
        timestamps:false
    })
    return UserProfile;
}


