const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');


class TeamLeader extends Model{};
TeamLeader.init({
    teamLeader_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    teamLeader_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    teamLeader_email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    teamLeader_password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,timestamps:false});
module.exports=TeamLeader;