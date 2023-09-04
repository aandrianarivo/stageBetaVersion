const { Model, DataTypes } = require('sequelize');
const sequelize = require('./__sequelize');


class Request extends Model{};
Request.init({
    request_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    request_validTeamLeader:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    request_productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    request_quantity:{
        type:DataTypes.INTEGER
    },
    request_Status:{
        type:DataTypes.STRING,
        defaultValue:"IN PROGRESS",
        allowNull:false
    },
    request_proccesDate:{
        type:DataTypes.DATEONLY
    },
    request_date:{
        type:DataTypes.DATE,
        allowNull:false
    }


},{sequelize,timestamps:false});



module.exports= Request;