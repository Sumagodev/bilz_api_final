const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EnquirySheet = sequelize.define('EnquirySheet', {
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  business: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // date: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  contact_person: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  machine_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  machine_manufacturer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  machine_weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  machine_tool_weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mounting_position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mounting_hole_diameter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mounting_foot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_of_machine: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  machine_stokes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  machine_feed_rate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  current_location: {
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

module.exports = EnquirySheet;
