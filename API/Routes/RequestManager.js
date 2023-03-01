var express = require("express");
const { updateRequest } = require("../../DataBase/RequestRepo");
var router = express.Router();
const { createRequest , getAllRequests, UpdateRequest} = require('../Controllers/RequestController');

router.post('/createrequest',createRequest);

router.get('/allrequests',getAllRequests);

// router.post('/getemployeebyId',getLocationById);

// router.post('/deleteemployeebyId',deleteLocationById);

router.post('/updaterequest',UpdateRequest);

// router.post('/locationfilter',locationFilter);

module.exports=router;