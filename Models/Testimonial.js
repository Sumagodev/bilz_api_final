const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
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
  review: {
    type: DataTypes.TEXT,
    allowNull: false,
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

module.exports = Testimonial;