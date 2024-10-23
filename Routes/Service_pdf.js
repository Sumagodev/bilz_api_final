const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const {
  addNewsEvent,
  updateNewsEvent,
  getNewsEvents,
  isActiveStatus,
  isDeleteStatus,
} = require('../Controllers/Service_pdf');
const authenticateToken = require('../middleware/auth');
const {
  validateNewsEvent,
  validateNewsEventId,
} = require('../Validations/newsEventValidation');

const router = express.Router();

router.post('/add', uploadFiles, authenticateToken, validateNewsEvent, addNewsEvent);
router.put('/update/:id', uploadFiles, authenticateToken, validateNewsEvent, validateNewsEventId, updateNewsEvent);
router.get('/get', getNewsEvents);
router.get('/find',authenticateToken, getNewsEvents);
router.put('/isactive/:id', authenticateToken, validateNewsEventId, isActiveStatus);
router.delete('/isdelete/:id', authenticateToken, validateNewsEventId, isDeleteStatus);

module.exports = router;
