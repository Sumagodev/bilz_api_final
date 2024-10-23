// models/ServiceName.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceName = sequelize.define('ServiceName', {
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

module.exports = ServiceName;