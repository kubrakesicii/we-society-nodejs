const { DataTypes, Model } = require("sequelize");
require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model{
      static associate = (models) => {
          Category.hasMany(models.Article, {as:'Articles'})
      }
    }

    const attributes = {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: { type: DataTypes.STRING, allowNull: false },
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
    };
  
    Category.init(attributes, {
      sequelize,
      modelName:"Category",
      timestamps: false
    })
    return Category;
}  