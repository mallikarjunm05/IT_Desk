var express = require("express");
const { updateRequest } = require("../../DataBase/RequestRepo");
var router = express.Router();
const { createRequest , getAllRequests, UpdateRequest,getfilteredRequests,getRequestbyId} = require('../Controllers/RequestController');

router.post('/createrequest',createRequest);

router.get('/allrequests',getAllRequests);

router.post('/updaterequest',UpdateRequest);

router.post('/filter',getfilteredRequests);

router.post('/requestbyid',getRequestbyId);

module.exports=router;