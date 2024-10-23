// // // controllers/productDetailController.js
// const ProductDetail = require('../Models/ServiceDetail');
// const Product = require('../Models/servicename');

// // Create new product details for a product
// // Create new product details for a product
// exports.createProductDetail = async (req, res) => {
//     try {
//         const { title, description, productId } = req.body;
//         const img = req.file ? req.file.path : null;
        
//         // Find the product in the ServiceName (or ProductName) table
//         const product = await Product.findByPk(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Create the product detail
//         const productDetail = await ProductDetail.create({
//             img,
//             title,
//             description,
//             productId,
//         });

//         // Fetch the product's title to include in the response
//         const productWithTitle = await ProductDetail.findOne({
//             where: { id: productDetail.id },
//             include: [
//                 {
//                     model: Product, // Include the ServiceName or ProductName table
//                     attributes: ['title'], // Include only the 'title' field from the ServiceName table
//                 },
//             ],
//         });

//         res.status(201).json(productWithTitle);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all details for a specific product
// // exports.getProductDetailsByProductId = async (req, res) => {
// //     try {
// //         const productDetails = await ProductDetail.findAll({
// //             where: { productId: req.params.productId }
// //         });
// //         if (productDetails.length === 0) {
// //             return res.status(404).json({ message: "No details found for this product" });
// //         }
// //         res.status(200).json(productDetails);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };
// exports.getProductDetailsByProductId = async (req, res) => {
//   try {
//       const productDetails = await ProductDetail.findAll({
//           where: { productId: req.params.productId },
//           include: [
//               {
//                   model: Product, // The ProductName or ServiceName table
//                   attributes: ['title'], // Include only the 'title' field from the ServiceName table
//               },
//           ],
//       });
//       if (productDetails.length === 0) {
//           return res.status(404).json({ message: "No details found for this product" });
//       }
//       res.status(200).json(productDetails);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };
// exports.getAllProductDetails = async (req, res) => {
//   try {
//       const productDetails = await ProductDetail.findAll({
//           include: [
//               {
//                   model: Product, // Include the ServiceName or ProductName table
//                   attributes: ['title'], // Include only the 'title' field from the ServiceName table
//               },
//           ],
//       });
//       res.status(200).json(productDetails);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };



// // Update product details by ID
// exports.updateProductDetail = async (req, res) => {
//     try {
//         const { img, title, description } = req.body;
//         const productDetail = await ProductDetail.findByPk(req.params.id);
//         if (!productDetail) {
//             return res.status(404).json({ message: "Product detail not found" });
//         }

//         productDetail.img = img;
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


const ServiceDetail = require('../Models/ServiceDetail');
const ServiceName = require('../Models/servicename');
const apiResponse = require('../helper/apiResponse');

// Create new service details for a service
exports.createServiceDetail = async (req, res) => {
    try {
        const { title, description, productId } = req.body;
        const img = req.file ? req.file.path : null; // Handling single image upload
        
        const product = await ServiceName.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Service not found" });
        }

        const serviceDetail = await ServiceDetail.create({
            img,
            title,
            description,
            productId,
        });

        res.status(201).json(serviceDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all details for a specific service
exports.getServiceDetailsByProductId = async (req, res) => {
    try {
        const serviceDetails = await ServiceDetail.findAll({
            where: { productId: req.params.productId }
        });
        if (serviceDetails.length === 0) {
            return res.status(404).json({ message: "No details found for this service" });
        }
        res.status(200).json(serviceDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all service details
exports.getAllServiceDetails = async (req, res) => {
    try {
        // Fetch all service details where isDelete is false, if applicable
        const serviceDetails = await ServiceDetail.findAll({
            include: [
                {
                  model: ServiceName, // This performs a JOIN with the Product table
                  attributes: ['title'], // Only include the 'title' field from the Product table
                },
              ],
        });

        // Base URL for images
        const baseUrl = `${req.protocol}://${req.get('host')}/`;

        // Add base URL to image path for each service detail
        const serviceDetailsWithBaseUrl = serviceDetails.map(serviceDetail => {
            return {
                ...serviceDetail.toJSON(), // Convert Sequelize instance to plain object
                img: serviceDetail.img ? baseUrl + serviceDetail.img.replace(/\\/g, '/') : null ,
                servicename: ServiceName ? ServiceName.title : null, 
            };
        });

        // res.status(200).json(serviceDetailsWithBaseUrl);
        return apiResponse.successResponseWithData(res, 'Exhibition retrieved successfully', serviceDetailsWithBaseUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update service detail by ID
exports.updateServiceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description,productId } = req.body;
        const img = req.file ? req.file.path : null;
    
        const serviceDetail = await ServiceDetail.findByPk(id); // Change the variable name to 'serviceDetail'
        if (!serviceDetail) {
            return apiResponse.notFoundResponse(res, 'Exhibition not found');
        }
    
        serviceDetail.img = img || serviceDetail.img;
        serviceDetail.title = title;
        serviceDetail.description = description;
        serviceDetail.productId =productId;
        await serviceDetail.save();

        res.status(200).json(serviceDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete service detail by ID
exports.deleteServiceDetail = async (req, res) => {
    try {
        const serviceDetail = await ServiceDetail.findByPk(req.params.id);
        if (!serviceDetail) {
            return res.status(404).json({ message: "Service detail not found" });
        }
        await serviceDetail.destroy();
        res.status(200).json({ message: "Service detail deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.isActiveStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const serviceDetail = await ServiceDetail.findByPk(id);
  
      if (!serviceDetail) {
        return apiResponse.notFoundResponse(res, 'Product not found');
      }
  
      serviceDetail.isActive = !serviceDetail.isActive;
      await serviceDetail.save();
  
      res.status(200).json(serviceDetail);
    } catch (error) {
      console.error('Toggle Product active status failed', error);
      return apiResponse.ErrorResponse(res, 'Toggle Product active status failed');
    }
  };