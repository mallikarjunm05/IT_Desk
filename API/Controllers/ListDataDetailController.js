const { fileNanme, logger } = require('../../log4');
const ListDataDetailRepo = require('../../DataBase/ListDataDetailRepo')
const ListDataDetailService = require('../../Services/ListDataDetailService')
const DB = require('../../DataBase/db')

var fname;

fileNanme(__filename).then((data)=>{
  fname = data;
});

const getCodeByMasterId = async(req,res) => {
  try {
    logger.info(`file: ${fname} getCodeByMasterId is called`);
    
    const dbConnection = await DB.ConnectToDb();
    const result = await ListDataDetailRepo.getCodeByListMstId(req.body,dbConnection);
    
    await dbConnection.release();
    res.status(200).json({
      Status: {
        StatusCode: 200,
        StatusType: "Success",
        StatusMessage: "Record Found",
        StatusSeverity: "Information",
      },
      result
    });
  }
  catch(err){
    logger.fatal(`file: ${fname},error: ${err}`); 
    res.status(500).json({err});
  }
}

const getCodeByDetailId = async(req,res) => {
  try {
    logger.info(`file: ${fname} getCodeByDetailId is called`);
    
    const dbConnection = await DB.ConnectToDb();
    const result = await ListDataDetailRepo.getCodeByListDtlId(req.body,dbConnection);
    
    await dbConnection.release();
    res.status(200).json({
      Status: {
        StatusCode: 200,
        StatusType: "Success",
        StatusMessage: "Record Found",
        StatusSeverity: "Information",
      },
      result
    });
    
  }
  catch(err){
    logger.fatal(`file: ${fname},error: ${err}`); 
    res.status(500).json({err});
  }
}

const addDetailRecord = async(req,res) => {
  try {
    logger.info(`file: ${fname} addDetailRecord is called`);
    
    const dbConnection = await DB.ConnectToDb();
    const result = await ListDataDetailService.addDetailData(req.body,dbConnection);
    
    await dbConnection.release();
    if(result.affectedRows == 1){
      res.status(200).json({
        Status: {
          StatusCode: 200,
          StatusType: "Success",
          StatusMessage: "Record Added successfully",
          StatusSeverity: "Information",
        }
      });
    }
    else{
      logger.fatal(`file: ${fname},error: ${err}`); 
      res.status(500).json({err : 'Could not add record'});
    }
  }
  catch(err){
    logger.fatal(`file: ${fname},error: ${err}`); 
    res.status(500).json({err});
  }
}

const deleteMasterbyDtlId = async(req,res) => {
  try {
       logger.info(`file: ${fname} deleteMasterbyDtlId is called`);

       const dbConnection = await DB.ConnectToDb();
       const result = await ListDataDetailService.deleteDetailbyDetailId(req.body,dbConnection);

       await dbConnection.release();
       res.status(200).json({result});
  }
  catch(err){
      logger.fatal(`file: ${fname},error: ${err}`); 
      res.status(500).json({err});
  }
}

const deleteDetailbyMstId = async(req,res) => {
  try {
       logger.info(`file: ${fname} deleteDetailbyMstId is called`);

       const dbConnection = await DB.ConnectToDb();
       const result = await ListDataDetailService.deleteDetailbyMasterId(req.body,dbConnection);

       await dbConnection.release();
       res.status(200).json({result});
  }
  catch(err){
      logger.fatal(`file: ${fname},error: ${err}`); 
      res.status(500).json({err});
  }
}

module.exports = { getCodeByMasterId , getCodeByDetailId , addDetailRecord , deleteMasterbyDtlId , deleteDetailbyMstId };
