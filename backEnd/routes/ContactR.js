const ContactRoute = require('express').Router();
const {ContactCtrl}= require('../controllers/index');
const {Contact} = ContactCtrl;


ContactRoute.post('/create-contact',Contact.createContact);

module.exports = ContactRoute