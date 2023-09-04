const sequelize = require('./__sequelize');
const {DataTypes,Model} = require('sequelize');



class Contact extends Model{};
Contact.init({
    contact_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    contact_date:{
        type:DataTypes.DATEONLY
    },
    contact_message:{
        type:DataTypes.STRING
    }
},{sequelize,timestamps:false});

module.exports = Contact;
