const RequestRoute = require('express').Router();
const {RequestCtrl}=require('../controllers/')
const {Request} = RequestCtrl;
RequestRoute.get('/list-request',Request.listRequest);
RequestRoute.post('/create-request',Request.createRequest);
RequestRoute.get('/listbytl-request/:ref',Request.findReqByTL);
RequestRoute.put('/validbytl-request',Request.validRequestbyTL);
RequestRoute.put('/validbyadmin-request',Request.validRequestbyAdmin);
RequestRoute.put('/update-request',Request.updateRequest);
RequestRoute.get('/listvalidtl-request',Request.reqListVadidateByTL);
RequestRoute.get('/listvalidadmin-request',Request.reqListVadidateByAdmin);
RequestRoute.get('/getrequest/:ref',Request.getRequest);
RequestRoute.get('/getrequestinprogress',Request.getRequestsInProgress);
RequestRoute.get('/getrequestinprogresscount',Request.getRequestsInProgressCount);



module.exports = RequestRoute;