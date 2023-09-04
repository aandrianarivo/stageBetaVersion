const TeamLeaderRoute = require('express').Router();
const { TeamLeaderCtrl } = require('../controllers');
const {TeamLeader} = TeamLeaderCtrl;
TeamLeaderRoute.get('/list-teamleader',TeamLeader.listTeamLeader);
TeamLeaderRoute.post('/create-teamleader',TeamLeader.createTeamLeader);
TeamLeaderRoute.put('/update-teamleader/:ref',TeamLeader.updateTeamLeader);
TeamLeaderRoute.get('/getusers/:ref',TeamLeader.getUsers);



module.exports = TeamLeaderRoute;