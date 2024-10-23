const { body, param } = require('express-validator');

exports.validateTeamMember = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .isString()
    .withMessage('description must be a string'),

];

exports.validateTeamMemberId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
