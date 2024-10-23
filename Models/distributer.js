const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Distributer = sequelize.define('distributer', {

   name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  msg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
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

module.exports = Distributer;
