const ProductRoute = require('express').Router();
const { ProductCtrl } = require('../controllers');
const {Product} = ProductCtrl;
ProductRoute.get('/list-product',Product.listProduct);
ProductRoute.post('/create-product',Product.createProduct);
ProductRoute.put('/add-product',Product.addProduct);
ProductRoute.put('/update-product/:ref',Product.updateProduct);
ProductRoute.delete('/delete-product/:ref',Product.deleteProduct);
ProductRoute.get('/getmostrequested',Product.getMostRequestedProducts);
ProductRoute.get('/getlowstock',Product.getLowStockProducts);
ProductRoute.get('/getlowstockcount',Product.getLowStockProductCount);
ProductRoute.get('/getproductstock',Product.getProductStats);






module.exports = ProductRoute;