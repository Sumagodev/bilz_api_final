const express = require('express');
// const { upload } = require('../middleware/multer');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const { validateOffice, validateOfficeId } = require('../Validations/officeValidation');
const {
  addOffice,
  updateOffice,
  getOffices,
  toggleOfficeStatus,
  toggleOfficeDelete,
} = require('../Controllers/apply_now');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', uploadFiles, validateOffice, addOffice);
router.put('/update/:id', uploadFiles, authenticateToken, validateOffice, validateOfficeId, updateOffice);
router.get('/get', getOffices);
router.get('/find', authenticateToken, getOffices);
router.put('/isactive/:id', authenticateToken, validateOfficeId, toggleOfficeStatus);
router.delete('/isdelete/:id', authenticateToken, validateOfficeId, toggleOfficeDelete);

module.exports = router;
