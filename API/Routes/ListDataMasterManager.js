var express = require("express");
var router = express.Router();
const { getCodeByMasterId , addMasterRecord , deleteMasterbyId } = require('../Controllers/ListDataMasterController')

router.post('/getCode',getCodeByMasterId);

router.post('/add',addMasterRecord);

router.delete('/deletebyid',deleteMasterbyId);

module.exports=router;