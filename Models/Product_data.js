
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');
const Product_Image2 =require('./ProductImage');
const { slugify } = require('../helper/slugify');

const ProductData = sequelize.define('ProductData', {
   
    title_pro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductName,
            key: 'id'
        },
        allowNull: false,
    },
subproductId:{
        type: DataTypes.INTEGER,
        references: {
            model: Product_Image2,
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
    tableName: 'Product_Data',
    });


// Setting up the foreign key
ProductData.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductData, { foreignKey: 'productId' });

ProductData.belongsTo(Product_Image2, { foreignKey: 'subproductId', onDelete: 'CASCADE' });  // New association with Category
Product_Image2.hasMany(ProductData, { foreignKey: 'subproductId' });

module.exports = ProductData;


