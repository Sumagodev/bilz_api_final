const express = require('express');
const { upload } = require('../middleware/multer');
const { validateCarrousalId } = require('../Validations/carrouselValidation');
const {
  addCarrousal,
  updateCarrousal,
  getCarrousals,
  toggleCarrousalStatus,
  toggleCarrousalDelete
} = require('../Controllers/carrousel');
const authenticateToken = require('../middleware/auth');
// const imageRequired = require('../validations/imageValidation');

const router = express.Router();

router.post('/add', upload.single('img'), authenticateToken, addCarrousal);
router.put('/update/:id', upload.single('img'), authenticateToken, validateCarrousalId, updateCarrousal);
router.get('/get', getCarrousals);
router.get('/find', authenticateToken, getCarrousals);
router.put('/isactive/:id', authenticateToken, validateCarrousalId, toggleCarrousalStatus);
router.delete('/isdelete/:id', authenticateToken, validateCarrousalId, toggleCarrousalDelete);

module.exports = router;
