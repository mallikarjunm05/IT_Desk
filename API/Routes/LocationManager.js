var express = require("express");
var router = express.Router();
const {EditLocationdetails,addLocation,deleteLocationById,getLocation,getLocationById,locationFilter } = require('../Controllers/LocationController');

router.get('/',getLocation);

router.post('/add',addLocation);

router.post('/getemployeebyId',getLocationById);

router.post('/deleteemployeebyId',deleteLocationById);

router.post('/updateemp',EditLocationdetails);

router.post('/locationfilter',locationFilter);

module.exports=router;