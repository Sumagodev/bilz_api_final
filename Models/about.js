const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HeaderContact = sequelize.define("headercontacts", {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = HeaderContact;



