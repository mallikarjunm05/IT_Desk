var express = require("express");
var router = express.Router();
const { getCodeByMasterId , getCodeByDetailId , addDetailRecord , deleteDetailbyMstId , deleteMasterbyDtlId } = require('../Controllers/ListDataDetailController')

router.post('/getCodeByMasterID',getCodeByMasterId);

router.post('/getCodeByDetailID',getCodeByDetailId);

router.post('/add', addDetailRecord)

router.delete('/deletebymasterid', deleteDetailbyMstId);

router.delete('/deletebydetailid', deleteMasterbyDtlId);

module.exports=router;