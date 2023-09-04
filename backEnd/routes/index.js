const RootRouter = require('express').Router();
RootRouter.use('/user',require('./UserR'));
RootRouter.use('/product',require('./ProductR'));
RootRouter.use('/request',require('./RequestR'));
RootRouter.use('/teamleader',require('./TeamLeaderR'));
RootRouter.use('/admin',require('./AdminR'));
RootRouter.use('/supplier',require('./SupplierR'));
RootRouter.use('/department',require('./Department'));
RootRouter.use('/region',require('./RegionR'));
RootRouter.use('/contact',require('./ContactR'));






module.exports = RootRouter;