// // // controllers/productDetailController.js
// const ProductDetail = require('../Models/Product_data2');
// const Product = require('../Models/ProductName');
// const apiResponse = require('../helper/apiResponse');

// // Create new product details for a product
// exports.createProductDetail = async (req, res) => {
//     try {
//         const {  title, description, productId } = req.body;

//         const product = await Product.findByPk(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         const productDetail = await ProductDetail.create({

//             title,
//             description,
//             productId,
//         });
//         res.status(201).json(productDetail);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all details for a specific product
// exports.getProductDetailsByProductId = async (req, res) => {
//     try {
//         const productDetails = await ProductDetail.findAll({
//             where: { productId: req.params.productId }
//         });
//         if (productDetails.length === 0) {
//             return res.status(404).json({ message: "No details found for this product" });
//         }
//         res.status(200).json(productDetails);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// // exports.getAllProductDetails = async (req, res) => {
// //     try {
// //         // Fetch all service details where isDelete is false, if applicable
// //         const productDetails = await ProductDetail.findAll();

// //         // Base URL for images
// //         const baseUrl = `${req.protocol}://${req.get('host')}/`;

// //         // Add base URL to image path for each service detail
// //         const serviceDetailsWithBaseUrl = productDetails.map(productDetail => {
// //             return {
// //                 ...productDetail.toJSON(), // Convert Sequelize instance to plain object
// //                 img: productDetail.img ? baseUrl + productDetail.img.replace(/\\/g, '/') : null 
// //             };
// //         });

// //         // res.status(200).json(serviceDetailsWithBaseUrl);
// //         return apiResponse.successResponseWithData(res, 'Exhibition retrieved successfully', serviceDetailsWithBaseUrl);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };
// exports.getAllProductDetails = async (req, res) => {
//     try {
//       // Fetch all product details and include related product name from Product table
//       const productDetails = await ProductDetail.findAll({
//         include: [
//           {
//             model: Product, // This performs a JOIN with the Product table
//             attributes: ['productName'], // Only include the 'title' field from the Product table
//           },
//         ],
//       });

//       // Base URL for images
//     //   const baseUrl = `${req.protocol}://${req.get('host')}/`;

//       // Add base URL to image path for each product detail and include product name
//       const productDetailsWithBaseUrl = productDetails.map(productDetail => {
//         const product = productDetail.Product; // Access the joined Product data
//         return {
//           ...productDetail.toJSON(), // Convert Sequelize instance to plain object
//         //   img: productDetail.img ? baseUrl + productDetail.img.replace(/\\/g, '/') : null, // Add base URL to image
//           productName: product ? product.productName : null, // Include the product title (or productName) from the Product table
//         };
//       });

//       // Return the response with the product details and associated product name
//       return apiResponse.successResponseWithData(res, 'Product details retrieved successfully', productDetailsWithBaseUrl);
//     } catch (error) {
//       console.error('Error retrieving product details:', error);
//       res.status(500).json({ message: error.message });
//     }
//   };

// // Update product details by ID
// exports.updateProductDetail = async (req, res) => {
//     try {
//         const {  title, description } = req.body;
//         const productDetail = await ProductDetail.findByPk(req.params.id);
//         if (!productDetail) {
//             return res.status(404).json({ message: "Product detail not found" });
//         }


//         productDetail.title = title;
//         productDetail.description = description;
//         await productDetail.save();
//         res.status(200).json(productDetail);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete product detail by ID
// exports.deleteProductDetail = async (req, res) => {
//     try {
//         const productDetail = await ProductDetail.findByPk(req.params.id);
//         if (!productDetail) {
//             return res.status(404).json({ message: "Product detail not found" });
//         }
//         await productDetail.destroy();
//         res.status(200).json({ message: "Product detail deleted" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// // controllers/productDetailController.js
const ProductDetail = require('../Models/Product_data2');
const Product = require('../Models/ProductName');
const Product_Image2 = require('../Models/ProductImage');
const apiResponse = require('../helper/apiResponse');
const { slugify } = require('../helper/slugify');

// Create new product details for a product
exports.createProductDetail = async (req, res) => {
  try {
    const { title, description, productId, subproductId } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if sub-product exists
    const product_image2 = await Product_Image2.findByPk(subproductId);
    if (!product_image2) {
      return res.status(404).json({ message: "Sub Product not found" });
    }

    // Generate slug from title
    // const slug = slugify(title);

    // Create the product detail with the slug
    const productDetail = await ProductDetail.create({
      title,
      description,
      productId,
      subproductId,
      // slug // Add the generated slug
    });

    res.status(201).json(productDetail);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get all details for a specific product
exports.getProductDetailsByProductId = async (req, res) => {
  try {
    const productDetails = await ProductDetail.findAll({
      where: { subproductId: req.params.subproductId },
      include: [
        { model: Product, attributes: ['productName'] },
        { model: Product_Image2, attributes: ['title'] } // Include category name
      ]
    });
    if (productDetails.length === 0) {
      return res.status(404).json({ message: "No details found for this product" });
    }
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProductDetailsByProductsubId = async (req, res) => {
  try {
    const { productId, subproductId } = req.params;  // Destructuring both params from the request

    const productDetails = await ProductDetail.findAll({
      where: {
        productId: productId,        // Matching productId
        subproductId: subproductId   // Matching subproductId
      }
    });

    if (productDetails.length === 0) {
      return res.status(404).json({ message: "No details found for this product and subproduct combination" });
    }

    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getAllProductDetails = async (req, res) => {
//     try {
//         // Fetch all service details where isDelete is false, if applicable
//         const productDetails = await ProductDetail.findAll();

//         // Base URL for images
//         const baseUrl = `${req.protocol}://${req.get('host')}/`;

//         // Add base URL to image path for each service detail
//         const serviceDetailsWithBaseUrl = productDetails.map(productDetail => {
//             return {
//                 ...productDetail.toJSON(), // Convert Sequelize instance to plain object
//                 img: productDetail.img ? baseUrl + productDetail.img.replace(/\\/g, '/') : null 
//             };
//         });

//         // res.status(200).json(serviceDetailsWithBaseUrl);
//         return apiResponse.successResponseWithData(res, 'Exhibition retrieved successfully', serviceDetailsWithBaseUrl);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.getAllProductDetails = async (req, res) => {
  try {
    // Fetch all product details and include related product name from Product table
    const productDetails = await ProductDetail.findAll({
      include: [
        {
          model: Product, // This performs a JOIN with the Product table
          attributes: ['productName']
        },
        { model: Product_Image2, attributes: ['title'] }  // Only include the 'title' field from the Product table

      ],
    });

    // Base URL for images
    //   const baseUrl = `${req.protocol}://${req.get('host')}/`;

    // Add base URL to image path for each product detail and include product name
    const productDetailsWithBaseUrl = productDetails.map(productDetail => {
      const product = productDetail.Product;
      const product_image2 = productDetail.Product_Image2; // Access the joined Product data
      return {
        ...productDetail.toJSON(), // Convert Sequelize instance to plain object
        //   img: productDetail.img ? baseUrl + productDetail.img.replace(/\\/g, '/') : null, // Add base URL to image
        // productName: product ? product.productName : null, // Include the product title (or productName) from the Product table
        // title:product_image2 ? product_image2.title:null
      };
    });

    // Return the response with the product details and associated product name
    return apiResponse.successResponseWithData(res, 'Product details retrieved successfully', productDetailsWithBaseUrl);
  } catch (error) {
    console.error('Error retrieving product details:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update product details by ID
exports.updateProductDetail = async (req, res) => {
  try {
    const { title, description, productId, subproductId } = req.body; // Destructure slug from the body
    const productDetail = await ProductDetail.findByPk(req.params.id);
    if (!productDetail) {
      return res.status(404).json({ message: "Product detail not found" });
    }

    // Update fields, ensuring to check for valid data
    productDetail.title = title || productDetail.title;
    productDetail.description = description || productDetail.description;
    productDetail.productId = productId || productDetail.productId;
    productDetail.subproductId = subproductId || productDetail.subproductId;
    // productDetail.
    // slug = slug || slugify(title, { lower: true, strict: true }); // Generate slug if not provided

    await productDetail.save(); // Save the updated product details
    res.status(200).json(productDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// exports.updateProductDetail = async (req, res) => {
//     try {
//         const {  title, description } = req.body;
//         const productDetail = await ProductDetail.findByPk(req.params.id);
//         if (!productDetail) {
//             return res.status(404).json({ message: "Product detail not found" });
//         }


//         productDetail.title = title;
//         productDetail.description = description;
//         await productDetail.save();
//         res.status(200).json(productDetail);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Delete product detail by ID
exports.deleteProductDetail = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findByPk(req.params.id);
    if (!productDetail) {
      return res.status(404).json({ message: "Product detail not found" });
    }
    await productDetail.destroy();
    res.status(200).json({ message: "Product detail deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await ProductDetail.findByPk(id);

    if (!productDetail) {
      return apiResponse.notFoundResponse(res, 'productDetail not found');
    }

    productDetail.isActive = !productDetail.isActive;
    await productDetail.save();

    res.status(200).json(productDetail);
  } catch (error) {
    console.error('Toggle productDetail active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle productDetail active status failed');
  }
};