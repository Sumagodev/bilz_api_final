
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const ProductName = require('./ProductName');

// const ProductData2 = sequelize.define('ProductData2', {
   
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     productId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: ProductName,
//             key: 'id'
//         },
//         allowNull: false,
//     },
//     }, {
//     timestamps: true,
//     tableName: 'Product_Data2',
//     });

// // Setting up the foreign key
// ProductData2.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
// ProductName.hasOne(ProductData2, { foreignKey: 'productId' });

// module.exports = ProductData2;



const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');
const Product_Image2 =require('./ProductImage');
// const { slugify } = require('../helper/slugify');

const ProductData2 = sequelize.define('ProductData2', {
   
    title: {
        type: DataTypes.STRING,
        allowNull: true,
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
    // slug: {
    // type: DataTypes.STRING,
    // allowNull: false,
    // unique: true,
    // },
    subproductId:
    {
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
    tableName: 'Product_Data2',
    });

// Setting up the foreign key
ProductData2.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductData2, { foreignKey: 'productId' });

ProductData2.belongsTo(Product_Image2, { foreignKey: 'subproductId', onDelete: 'CASCADE' });  // New association with Category
Product_Image2.hasMany(ProductData2, { foreignKey: 'subproductId' });

module.exports = ProductData2;


