const { body, param } = require('express-validator');

exports.validateNewsEvent = [
    body('productName')
    .notEmpty()
    .withMessage('Product name is required'),
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('desc')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),
 
];

exports.validateNewsEventId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
