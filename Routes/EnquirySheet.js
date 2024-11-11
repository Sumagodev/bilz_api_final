const express = require('express');
const { validateEnquirySheet, validateEnquirySheetId } = require('../Validations/EnquirySheetValidation');
const {
    addEnquirySheet,
    getEnquirySheet,
    DeleteEnquirySheet,
} = require('../Controllers/EnquirySheet');
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post('/add',validateEnquirySheet, addEnquirySheet);
router.get('/get', authenticateToken, validateEnquirySheet, getEnquirySheet);
router.delete('/isdelete/:id', authenticateToken, validateEnquirySheetId, DeleteEnquirySheet);

module.exports = router;
