// models/Event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Vibration1', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  desc: {
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
}, {
  timestamps: true,
});

module.exports = Event;
