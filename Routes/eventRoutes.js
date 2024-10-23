// routes/eventRoutes.js
const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addEvent,
  updateEvent,
  getEvents,
  isActiveStatusEvent,
  isDeleteStatusEvent,
} = require('../Controllers/eventController');
const authenticateToken = require('../middleware/auth');
const {
  validateEvent,
  validateEventId,
} = require('../Validations/eventValidation');

const router = express.Router();

router.post('/add', upload.single('img'), authenticateToken, validateEvent, addEvent);
router.put('/update/:id', upload.single('img'), authenticateToken, validateEvent, validateEventId, updateEvent);
router.get('/get', getEvents);
router.get('/find', authenticateToken, getEvents);
router.put('/isactive/:id', authenticateToken, validateEventId, isActiveStatusEvent);
router.delete('/isdelete/:id', authenticateToken, validateEventId, isDeleteStatusEvent);

module.exports = router;
