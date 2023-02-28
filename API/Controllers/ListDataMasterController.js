const { fileNanme, logger } = require('../../log4');
const ListDataMasterRepo = require('../../DataBase/ListDataMasterRepo')
const ListDataMasterService = require('../../Services/ListDataMasterServices')
const DB = require('../../DataBase/db')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

const getCodeByMasterId = async(req,res) => {
    try {
         logger.info(`file: ${fname} getCodeByMasterId is called`);

         const dbConnection = await DB.ConnectToDb();
         const result = await ListDataMasterRepo.getCodeByMasterId(req.body,dbConnection);
         console.log(result);

         await dbConnection.release();
         res.status(200).json({result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({err});
    }
}

const addMasterRecord = async(req,res) => {
    try {
         logger.info(`file: ${fname} addMasterRecord is called`);

         const dbConnection = await DB.ConnectToDb();
         const result = await ListDataMasterService.addMasterData(req.body,dbConnection);

         await dbConnection.release();
         res.status(200).json({result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({err});
    }
}

const deleteMasterbyId = async(req,res) => {
    try {
         logger.info(`file: ${fname} deleteMasterbyId is called`);

         const dbConnection = await DB.ConnectToDb();
         const result = await ListDataMasterService.deleteMasterbyId(req.body,dbConnection);

         await dbConnection.release();
         res.status(200).json({result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({err});
    }
}

module.exports = { getCodeByMasterId , addMasterRecord , deleteMasterbyId };
