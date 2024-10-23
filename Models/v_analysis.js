const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Analysis = sequelize.define("Analysis", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Analysis;
