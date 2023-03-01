var express = require("express");
var router = express.Router();
const {  getAllRequestStatus,editrequestStatus} = require('../Controllers/RequestStatusController');

router.get('/allrequestStatus',getAllRequestStatus);

router.get('/editrequestStatus',editrequestStatus);

module.exports=router;