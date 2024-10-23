const express = require('express');

const productImagesController=require('../Controllers/Product_data2');
const { validateProductName, validateProductNameId } = require('../Validations/productNameValidation');
const authenticateToken = require('../middleware/auth');

const router = express.Router();



router.post('/add',authenticateToken,productImagesController.createProductDetail);
router.get('/get/:subproductId', productImagesController.getProductDetailsByProductId);
router.get('/find',authenticateToken, productImagesController.getAllProductDetails);
router.put('/isactive/:id', authenticateToken, validateProductNameId, productImagesController.isActiveStatus);
router.get('/get', productImagesController.getAllProductDetails);


router.put('/update/:id', productImagesController.updateProductDetail);




router.delete('/isdelete/:id', productImagesController.deleteProductDetail);


module.exports = router;