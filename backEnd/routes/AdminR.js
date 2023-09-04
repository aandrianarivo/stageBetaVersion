const AdminRoute = require('express').Router();
const {AdminCtrl} = require('../controllers/index.js');
const {Admin} = AdminCtrl;
// AdminRoute.post("/login-admin",Admin.loginUser)
// AdminRoute.get('/list-user',Admin.listUser);
AdminRoute.put('/update-admin',Admin.updateAdmin);
AdminRoute.post('/create-admin',Admin.createAdmin);


module.exports =AdminRoute;
