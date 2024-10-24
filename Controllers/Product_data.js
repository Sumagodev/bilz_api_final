// // controllers/productDetailController.js
const ProductDetail = require('../Models/Product_data');
const Product = require('../Models/ProductName');
const Product_Image2 =require('../Models/ProductImage');
const apiResponse = require('../helper/apiResponse');
const { slugify } = require('../helper/slugify');

// Create new product details for a product
exports.createProductDetail = async (req, res) => {
  try {
      const { title_pro, description, productId, subproductId } = req.body;

      console.log("Product ID:", productId);
      console.log("Sub Product ID:", subproductId);

      // Find the product by productId
      const product = await Product.findByPk(productId);
      if (!product) {
          console.log("Product not found with ID:", productId);
          return res.status(404).json({ message: "Product not found" });
      }

      // Find the subproduct by subproductId
      const product_image2 = await Product_Image2.findByPk(subproductId);
      if (!product_image2) {
          console.log("Sub Product not found with ID:", subproductId);
          return res.status(404).json({ message: "Sub Product not found" });
      }

      // Generate slug from title
      // const slug = slugify(title);

      // Create the product detail with the slug
      const productDetail = await ProductDetail.create({
        title_pro,
          description,
          productId,
          subproductId
      });

      res.status(201).json(productDetail);
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: error.message });
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
            attributes: ['productName']},
            { model: Product_Image2, attributes: ['title'] }  // Only include the 'title' field from the Product table
          
        ],
      });
  
      // Base URL for images
    //   const baseUrl = `${req.protocol}://${req.get('host')}/`;
  
      // Add base URL to image path for each product detail and include product name
      const productDetailsWithBaseUrl = productDetails.map(productDetail => {
        const product = productDetail.Product; 
        const product_image2 = productDetail.Product_Image2;  // Access the joined Product data
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
      // Find product detail by ID
      const productDetail = await ProductDetail.findByPk(req.params.id);
      if (!productDetail) {
          return res.status(404).json({ message: "Product detail not found" });
      }

      const { title = '', description = '', productId = '', subproductId = '' } = req.body;

      // Generate a new slug if the title is provided and different from the current one
      // let slug = productDetail.slug; // Retain the existing slug by default
      // if (title && title !== productDetail.title) {
      //     slug = slugify(title, {
      //         lower: true, // convert to lowercase
      //         strict: true // remove special characters
      //     });
      // }

      // Update product detail fields
      productDetail.title = title || productDetail.title;
      productDetail.description = description || productDetail.description;
      productDetail.productId = productId || productDetail.productId;
      productDetail.subproductId = subproductId || productDetail.subproductId;
      // productDetail.slug = slug;  // Update the slug if changed

      // Save updated product detail
      await productDetail.save();

      // Respond with updated product detail
      res.status(200).json({ message: "Product detail updated successfully", productDetail });
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