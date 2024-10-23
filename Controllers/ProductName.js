const Product = require('../Models/ProductName');
const apiResponse = require('../helper/apiResponse');
const { slugify } = require('../helper/slugify');

// exports.createProduct = async (req, res) => {
//     try {
//         const { productName } = req.body;
//         // const img = req.file ? req.file.path : null;
//         const img = req.file.path;
//         const product = await Product.create({ productName,img});
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.createProduct = async (req, res) => {
  try {
      const { productName } = req.body;
      const img = req.file.path;

      // Generate slug from productName
      const slug = slugify(productName);

      const product = await Product.create({
          productName,
          slug, // Save the slug in the database
          img
      });

      res.status(201).json(product);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll({ where: { isDelete: false } });
  
      const baseUrl = `${req.protocol}://${req.get('host')}/`;
      const productsWithBaseUrl = products.map(products => {
        return {
          ...products.toJSON(),
          img: products.img ? baseUrl + products.img.replace(/\\/g, '/') : null
        };
      });
         return apiResponse.successResponseWithData(res, 'Apply now retrieved successfully', productsWithBaseUrl);
    } catch (error) {
      console.error('Get Apply now failed', error);
      return apiResponse.ErrorResponse(res, 'Get Apply now failed');
    }
  };

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { productName } = req.body;
        const img = req.file ? req.file.path : null;

        // Find the product by ID
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Generate slug from the new productName
        const slug = slugify(productName);

        // Update product fields
        product.productName = productName;
        product.slug = slug; // Update slug
        product.img = img || product.img;

        // Save updated product
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.isActiveStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
  
      if (!product) {
        return apiResponse.notFoundResponse(res, 'Product not found');
      }
  
      product.isActive = !product.isActive;
      await product.save();
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Toggle Product active status failed', error);
      return apiResponse.ErrorResponse(res, 'Toggle Product active status failed');
    }
  };
