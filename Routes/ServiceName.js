const express = require('express');
const { validateProductName, validateProductNameId } = require('../Validations/productNameValidation');
const {
  addProductName,
  getProductNames,
  updateProductName,
  isActiveStatus,
  isDeleteStatus,
  getProductById
} = require('../Controllers/ServiceName');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', authenticateToken, validateProductName, addProductName);
router.get('/get', getProductNames);
router.get('/get/:id',getProductById)
router.get('/find', authenticateToken, getProductNames);
router.put('/update/:id', authenticateToken, validateProductNameId, validateProductName, updateProductName);
router.put('/isactive/:id', authenticateToken, validateProductNameId, isActiveStatus);
router.delete('/isdelete/:id', authenticateToken, validateProductNameId, isDeleteStatus);

module.exports = router;
