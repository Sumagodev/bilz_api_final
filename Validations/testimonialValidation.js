const { body, param } = require('express-validator');

const validateTestimonial = [
  body('name').notEmpty().withMessage('Name is required'),
  body('company_Name').notEmpty().withMessage('Company_Name is required'),
  body('review').notEmpty().withMessage('Review is required'),
 
 
];

const validateTestimonialId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { validateTestimonial, validateTestimonialId };
