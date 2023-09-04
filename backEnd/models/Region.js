const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Region extends Model{};
Region.init({
    region_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    region_name:{
        type:DataTypes.STRING,
    }
},{sequelize,timestamps:false});

module.exports = Region;
