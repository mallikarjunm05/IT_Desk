var express = require("express");
var router = express.Router();
const {  getAllRequestStatus} = require('../Controllers/RequestStatusController');

router.get('/allrequestStatus',getAllRequestStatus);


module.exports=router;