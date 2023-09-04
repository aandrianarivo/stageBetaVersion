const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Contain extends Model{};
Contain.init({
    contain_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
},{sequelize,timestamps:false});

module.exports = Contain;
