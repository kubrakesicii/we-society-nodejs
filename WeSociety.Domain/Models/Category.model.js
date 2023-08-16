const { DataTypes, Model } = require("sequelize");
require('sequelize');

class Category extends Model{}

Category = (sequelize) => {
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
      IsActive: { type: DataTypes.TINYINT, default: 1 },
    };
  
    return sequelize.define("Category", attributes, {
      timestamps: false
    })
}

module.exports = Category;
  