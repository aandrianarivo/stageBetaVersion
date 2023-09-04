const UserRoute = require('express').Router();
const {UserCtrl} = require('../controllers/index.js');
const {User} = UserCtrl;
UserRoute.post("/login-user",User.loginUser)
UserRoute.get('/list-user',User.listUser);
UserRoute.post('/create-user',User.createUser);
UserRoute.put('/update-user',User.updateUser);
UserRoute.delete('/delete-user',User.deleteUser);


module.exports =UserRoute;
