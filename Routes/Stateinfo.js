const express = require('express');
// const { upload } = require('../middleware/multer');
// const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const { validateOffice, validateOfficeId } = require('../Validations/officeValidation');
const {
  addStateinfo,
  updateStateinfo,
  getStateinfos,
  toggleStateinfoStatus,
  toggleStateinfoDelete,getStateinfoByStatename
} = require('../Controllers/Stateinfo');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add',  validateOffice, addStateinfo);
router.put('/update/:id',   validateOffice, validateOfficeId, updateStateinfo);
router.get('/get', getStateinfos);
router.get('/find',  getStateinfos);
router.put('/isactive/:id',  validateOfficeId, toggleStateinfoStatus);
router.delete('/isdelete/:id',  validateOfficeId, toggleStateinfoDelete);
router.get('/get/:statename', getStateinfoByStatename);
module.exports = router;
