const SupplierRoute = require('express').Router();
const {SupplierCtrl} = require('../controllers/index.js');
const {Supplier} = SupplierCtrl;
SupplierRoute.post("/create-supplier",Supplier.createSupplier);
SupplierRoute.get('/list-supplier',Supplier.listSupplier);
SupplierRoute.put('/update-supplier/:ref',Supplier.updateSupplier);
SupplierRoute.delete('/delete-supplier/:ref',Supplier.deleteSupplier);


module.exports =SupplierRoute;
