const { body, param } = require('express-validator');

exports.addProductImageValidator = [
  body('productName')
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string'),
  
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

  body('desc')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),
  
  // No validation for image here since it's handled by Multer
];

exports.updateProductImageValidator = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .isInt()
    .withMessage('ID must be an integer'),

  body('productName')
    .optional()
    .isString()
    .withMessage('Product name must be a string'),

  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string'),

  body('desc')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  // No validation for image here since it's handled by Multer
];
