const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Admin extends Model{};
Admin.init({
    admin_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    admin_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    admin_password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    admin_email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,timestamps:false});

module.exports = Admin;
