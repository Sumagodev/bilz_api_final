const express = require('express');
// const { upload } = require('../middleware/multer');
// const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const { validateOffice, validateOfficeId } = require('../Validations/officeValidation');
const {
  addOffice,
  updateOffice,
  getOffices,
  toggleOfficeStatus,
  toggleOfficeDelete,
} = require('../Controllers/distributor');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add',  validateOffice, addOffice);
router.put('/update/:id',   validateOffice, validateOfficeId, updateOffice);
router.get('/get', getOffices);
router.get('/find',  getOffices);
router.put('/isactive/:id',  validateOfficeId, toggleOfficeStatus);
router.delete('/isdelete/:id',  validateOfficeId, toggleOfficeDelete);

module.exports = router;
