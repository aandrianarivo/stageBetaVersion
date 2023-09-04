const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Located extends Model{};
Located.init({
    located_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
},{sequelize,timestamps:false});

module.exports = Located;
