const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addTeamMember,
  updateTeamMember,
  getTeamMembers,
  isActiveStatus,
  isDeleteStatus,
} = require('../Controllers/teamController');
const authenticateToken = require('../middleware/auth');
const {
  validateTeamMember,
  validateTeamMemberId,
} = require('../Validations/teamValidation');

const router = express.Router();

router.post('/add', upload.single('img'), authenticateToken, validateTeamMember, addTeamMember);
router.put('/update/:id', upload.single('img'), authenticateToken, validateTeamMember, validateTeamMemberId, updateTeamMember);
router.get('/get', getTeamMembers);
router.get('/find', authenticateToken, getTeamMembers);
router.put('/isactive/:id', authenticateToken, validateTeamMemberId, isActiveStatus);
router.delete('/isdelete/:id', authenticateToken, validateTeamMemberId, isDeleteStatus);

module.exports = router;
