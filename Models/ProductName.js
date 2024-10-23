const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { slugify } = require('../helper/slugify'); // Utility to create a slug

const ProductName = sequelize.define('ProductName', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  img: {
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

module.exports = ProductName;
