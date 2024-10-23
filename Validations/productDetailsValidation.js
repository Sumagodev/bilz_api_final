const { body, param } = require('express-validator');

const validateProductDetails = [
  body('productName').notEmpty().withMessage('Product name is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('application').isJSON().withMessage('Application must be a JSON array'),
];

const validateProductDetailsId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateProductDetails, validateProductDetailsId };
