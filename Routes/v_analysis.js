const express = require('express');
const { addHeaderContact, updateHeaderContact, getHeaderContact, isActiveStatus, isDeleteStatus } = require('../Controllers/v_analysis');
const { validateHeaderContact, validateHeaderContactId } = require('../Validations/headerContactValidation');
const { validationResult } = require('express-validator');
const apiResponse = require('../helper/apiResponse');
const authenticateToken = require('../middleware/auth');

const router = express.Router();


// Add header contact
router.post('/add', authenticateToken, validateHeaderContact, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }
  next();
}, addHeaderContact);

// Update header contact
router.put('/update/:id', authenticateToken, validateHeaderContactId, validateHeaderContact, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }
  next();
}, updateHeaderContact);

// Get header contacts
router.get('/get', getHeaderContact);
router.get('/find', authenticateToken, getHeaderContact);

module.exports = router;

// Toggle header contact status
router.put('/isactive/:id', authenticateToken, validateHeaderContactId, isActiveStatus);

// Toggle header contact delete status
router.delete('/isdelete/:id', authenticateToken, validateHeaderContactId, isDeleteStatus);
