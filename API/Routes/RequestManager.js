var express = require("express");
var router = express.Router();
const { createRequest , getAllRequests} = require('../Controllers/RequestController');

router.post('/createrequest',createRequest);

router.get('/allrequests',getAllRequests);

// router.post('/getemployeebyId',getLocationById);

// router.post('/deleteemployeebyId',deleteLocationById);

// router.post('/updaterequest');

// router.post('/locationfilter',locationFilter);

module.exports=router;