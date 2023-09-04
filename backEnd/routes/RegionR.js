const RegionRoute = require("express").Router();
const {RegionCtrl} = require('../controllers/index');
const {Region} = RegionCtrl;
RegionRoute.post('/create-region',Region.createRegion);
RegionRoute.get('/list-region',Region.listRegion);
RegionRoute.delete('/delete-region/:ref',Region.deleteRegion);
RegionRoute.put('/update-region/:ref',Region.updateRegion);






module.exports = RegionRoute;
