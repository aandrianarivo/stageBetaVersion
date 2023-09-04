const DepartementRoute = require("express").Router();
const {DepartmentCtrl}=require("../controllers/index");
const {Department}=DepartmentCtrl;
DepartementRoute.post('/create-department',Department.createDepartment);
DepartementRoute.get('/list-department',Department.listDepartment);
DepartementRoute.put('/update-department',Department.updateDepartment);
DepartementRoute.delete('/delete-department',Department.deleteDepartment);
DepartementRoute.get('/getdepartstat',Department.getDepartmentStat);


module.exports = DepartementRoute;
