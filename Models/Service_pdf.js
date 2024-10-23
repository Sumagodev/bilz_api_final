const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsEvent = sequelize.define('News', {
 
  pdf: { // Add this field
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
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

module.exports = NewsEvent;
