const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Special = sequelize.define('Servicespecial', {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },


  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Special;
