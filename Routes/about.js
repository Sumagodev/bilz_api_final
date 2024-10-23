const express = require('express');
const { upload } = require('../middleware/multer');
const { validateTestimonial, validateTestimonialId } = require('../Validations/testimonialValidation');
const {
  addTestimonial,
  updateTestimonial,
  getTestimonials,
  isActiveStatus,
  isDeleteStatus
} = require('../Controllers/about');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', upload.single('img'), authenticateToken, validateTestimonial, addTestimonial);
router.put('/update/:id', upload.single('img'), authenticateToken, validateTestimonial, validateTestimonialId, updateTestimonial);
router.get('/get', getTestimonials);
router.get('/find', authenticateToken, getTestimonials);
router.put('/isactive/:id', authenticateToken, validateTestimonialId, isActiveStatus);
router.delete('/isdelete/:id', authenticateToken, validateTestimonialId, isDeleteStatus);

module.exports = router;