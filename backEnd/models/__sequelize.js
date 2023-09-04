const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('gestionStock','root','',{
    host:'localhost',
    dialect:'mysql',
    port:3300,
    logging:false
});

module.exports = sequelize;