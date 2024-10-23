const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Team = require('../Models/Team');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

// Add a new team member
exports.addTeamMember = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  const transaction = await sequelize.transaction();
  
  try {
    const { name, designation } = req.body;
    const img = req.file ? req.file.path : null;

    // Create the new team member
    const teamMember = await Team.create({
      img,
      name,
      designation,
      isActive: true,
      isDelete: false,
    }, { transaction });

    await transaction.commit();

    return apiResponse.successResponseWithData(
      res,
      'Team member added successfully',
      teamMember
    );
  } catch (error) {
    await transaction.rollback();
    console.error('Add team member failed', error);
    return apiResponse.ErrorResponse(res, 'Add team member failed');
  }
};

// Update an existing team member
exports.updateTeamMember = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { name, designation } = req.body;
    const img = req.file ? req.file.path : null;

    // Find the team member
    const teamMember = await Team.findByPk(id);
    if (!teamMember) {
      await transaction.rollback();
      return apiResponse.notFoundResponse(res, 'Team member not found');
    }

    // Update the team member
    teamMember.img = img || teamMember.img;
    teamMember.name = name;
    teamMember.designation = designation;
    await teamMember.save({ transaction });

    await transaction.commit();

    return apiResponse.successResponseWithData(
      res,
      'Team member updated successfully',
      teamMember
    );
  } catch (error) {
    await transaction.rollback();
    console.error('Update team member failed', error);
    return apiResponse.ErrorResponse(res, 'Update team member failed');
  }
};

// Get all team members
exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.findAll({ 
      where: { isDelete: false },
    });

    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const teamMembersWithBaseUrl = teamMembers.map(member => ({
      ...member.toJSON(),
      img: member.img ? baseUrl + member.img.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      'Team members retrieved successfully',
      teamMembersWithBaseUrl
    );
  } catch (error) {
    console.error('Get team members failed', error);
    return apiResponse.ErrorResponse(res, 'Get team members failed');
  }
};

// Toggle the active status of a team member
exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByPk(id);

    if (!teamMember) {
      return apiResponse.notFoundResponse(res, 'Team member not found');
    }

    teamMember.isActive = !teamMember.isActive;
    await teamMember.save();

    return apiResponse.successResponseWithData(
      res,
      'Team member active status updated successfully',
      teamMember
    );
  } catch (error) {
    console.error('Toggle team member active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle team member active status failed');
  }
};

// Toggle the delete status of a team member
exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByPk(id);

    if (!teamMember) {
      return apiResponse.notFoundResponse(res, 'Team member not found');
    }

    teamMember.isDelete = !teamMember.isDelete;
    await teamMember.save();

    return apiResponse.successResponseWithData(
      res,
      'Team member delete status updated successfully',
      teamMember
    );
  } catch (error) {
    console.error('Toggle team member delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle team member delete status failed');
  }
};
