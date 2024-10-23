const express = require('express');
const { addSocialContact, updateSocialContact, getSocialContact, isActiveStatus, isDeleteStatus } = require('../Controllers/SocialContact');
const { validateSocialContact, validateSocialContactId } = require('../Validations/socialcontact');
const { validationResult } = require('express-validator');
const apiResponse = require('../helper/apiResponse');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Add social contact
router.post('/add', validateSocialContact, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }
  next();
}, addSocialContact);

// Update social contact
router.put('/update/:id', authenticateToken, validateSocialContactId, validateSocialContact, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }
  next();
}, updateSocialContact);

// Get social contacts
router.get('/get', getSocialContact);
// Get social contacts
router.get('/find', authenticateToken, getSocialContact);

// Toggle social contact status
router.put('/isactive/:id', authenticateToken, validateSocialContactId, isActiveStatus);

// Toggle social contact delete status
router.delete('/isdelete/:id', authenticateToken, validateSocialContactId, isDeleteStatus);

module.exports = router;
