const { Model, UUID,DataTypes } = require("sequelize");
require('sequelize');

module.exports = (sequelize) => {
  class AspNetUser extends Model{
    static associate = (models) => {
        AspNetUser.belongsTo(models.UserProfile, {as:"UserProfile"})
    }
  }

  const attributes = {
    Id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    UserName: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false },
    PasswordHash: { type: DataTypes.STRING, allowNull: false },
    EmailConfirmed: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    PhoneNumberConfirmed: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false},
    TwoFactorEnabled: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    LockoutEnabled: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    AccessFailedCount: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
  };

    AspNetUser.init(attributes, {
      sequelize,
      modelName:'AspNetUser',
      timestamps: false
    })
    return AspNetUser;
}