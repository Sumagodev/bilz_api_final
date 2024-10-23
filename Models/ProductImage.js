
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');
const { slugify } = require('../helper/slugify');

const ProductImage = sequelize.define('ProductImage', {
    img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductName,
            key: 'id'
        },
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, {
    timestamps: true,
    tableName: 'Product_Image2',
    });

// Setting up the foreign key
ProductImage.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductImage, { foreignKey: 'productId' });

module.exports = ProductImage;


// CREATE TABLE Product_Data (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description TEXT NOT NULL,
//     productId INT,  -- Foreign key to ProductName
//     subproductId INT,  -- Foreign key to Category (new table)
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (productId) REFERENCES productnames(id) ON DELETE CASCADE,
//      FOREIGN KEY (subproductId) REFERENCES product_image2(id) ON DELETE SET NULL  -- New foreign key with action on delete
//   );