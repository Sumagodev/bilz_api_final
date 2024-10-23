const { body, param } = require('express-validator');

exports.validateNewsEvent = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
 
];

exports.validateNewsEventId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
