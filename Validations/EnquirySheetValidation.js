const { body, param } = require('express-validator');

const validateEnquirySheet = [
  body('company').notEmpty().withMessage('Company is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('business').notEmpty().withMessage('Business is required'),
  body('phoneno').notEmpty().withMessage('Phone is required'),
  body('contact_person').notEmpty().withMessage('Contact Person is required'),
  body('email_id').isEmail().withMessage('Valid email is required'),
  body('machine_type').notEmpty().withMessage('Machine Type is required'),
  body('machine_manufacturer').notEmpty().withMessage('Machine Manufacturer is required'),
  body('machine_weight').notEmpty().withMessage('Machine Weight is required'),
  body('machine_tool_weight').notEmpty().withMessage('Machine Tool Weight is required'),
  body('mounting_position').notEmpty().withMessage('Mounting Position is required'),
  body('mounting_hole_diameter').notEmpty().withMessage('Mounting Hole Diameter is required'),
  body('mounting_foot').notEmpty().withMessage('Mounting Foot is required'),
  body('speed_of_machine').notEmpty().withMessage('Speed Of Machine is required'),
  body('machine_stokes').notEmpty().withMessage('Machine Stokes is required'),
  body('machine_feed_rate').notEmpty().withMessage('Machine Feed Rate is required'),
//   body('current_location').notEmpty().withMessage('Current Location is required'),
];

const validateEnquirySheetId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateEnquirySheet, validateEnquirySheetId };
