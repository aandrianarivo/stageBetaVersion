const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Department extends Model{};
Department.init({
    department_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    department_name:{
        type:DataTypes.STRING,
    }
},{sequelize,timestamps:false});

module.exports = Department;
