const express = require('express');

const productImagesController=require('../Controllers/Product_data');
const { validateProductName, validateProductNameId } = require('../Validations/productNameValidation');
const authenticateToken = require('../middleware/auth');
const {
    validateTeamMember,
    validateTeamMemberId,
  } = require('../Validations/specail');
const router = express.Router();



router.post('/add',authenticateToken,productImagesController.createProductDetail);
router.get('/get/:subproductId', productImagesController.getProductDetailsByProductId);
router.get('/find',authenticateToken, productImagesController.getAllProductDetails);

router.get('/get', productImagesController.getAllProductDetails);


router.put('/update/:id', productImagesController.updateProductDetail);
router.put('/isactive/:id', authenticateToken,validateTeamMemberId, productImagesController.isActiveStatus);



router.delete('/isdelete/:id', productImagesController.deleteProductDetail);


module.exports = router;