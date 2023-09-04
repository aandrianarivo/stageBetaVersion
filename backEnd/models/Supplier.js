const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Supplier extends Model{};
Supplier.init({
    supplier_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    supplier_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    supplier_adrs:{
        type:DataTypes.STRING,
        allowNull:false
    },
    supplier_delivryMethod:{
        type:DataTypes.STRING
    },
    supplier_paymentMethod:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{sequelize,timestamps:false});

module.exports = Supplier;
