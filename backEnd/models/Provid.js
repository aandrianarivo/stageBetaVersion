const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Provid extends Model{};
Provid.init({
    provid_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
},{sequelize,timestamps:false});

module.exports = Provid;
