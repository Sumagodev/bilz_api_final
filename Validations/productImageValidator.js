// validators/productImageValidator.js
const { body } = require('express-validator');

exports.productImageValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),
  body('desc')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
];
