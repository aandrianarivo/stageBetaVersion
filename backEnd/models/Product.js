const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');


class Product extends Model{};
Product.init({
    product_ref:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    product_description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    product_unitprice:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    product_availableQuantity:{
        type:DataTypes.DOUBLE
    },
    product_requestedQuantity:{
        type:DataTypes.INTEGER
    },
    product_dateAdded:{
        type:DataTypes.DATEONLY,
        defaultValue:DataTypes.NOW,
    }

    

},{sequelize,timestamps:false});

module.exports = Product;


