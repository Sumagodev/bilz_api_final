const express = require('express');
const { upload } = require('../middleware/multer');
const { validateInfrastructure, validateInfrastructureId } = require('../Validations/infrastructureValidation');
const {
  addInfrastructure,
  updateInfrastructure,
  getInfrastructure,
  isActiveStatus,
  isDeleteStatus
} = require('../Controllers/Exhibition');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', upload.single('img'), authenticateToken, validateInfrastructure, addInfrastructure);
router.put('/update/:id', upload.single('img'), authenticateToken, validateInfrastructure, validateInfrastructureId, updateInfrastructure);
router.get('/get', getInfrastructure);
router.get('/find', authenticateToken, getInfrastructure);
router.put('/isactive/:id', authenticateToken, validateInfrastructureId, isActiveStatus);
router.delete('/isdelete/:id', authenticateToken, validateInfrastructureId, isDeleteStatus);

module.exports = router;
