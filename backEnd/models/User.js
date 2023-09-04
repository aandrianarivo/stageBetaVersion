const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class User extends Model{};
User.init({
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    user_password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,timestamps:false});

module.exports = User;


