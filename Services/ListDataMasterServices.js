const { fileNanme, logger } = require('../log4');
const MasterRepo = require('../DataBase/ListDataMasterRepo')
const DetailRepo = require('../DataBase/ListDataDetailRepo')
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

exports.addMasterData = async(data) => {
    try {
        logger.info(`file: ${fname} addMasterData is called`);
        const dbConnection = await DB.ConnectToDb();
        
        const result = await MasterRepo.addMasterData(data,dbConnection);

        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}

exports.deleteMasterbyId = async(data) => {
    try {
        logger.info(`file: ${fname} deleteMasterbyId is called`);
        const dbConnection = await DB.ConnectToDb();
        const resultdtl = await DetailRepo.deleteDetailbyMstId(data,dbConnection);
        const result = await MasterRepo.deleteMasterbyId(data,dbConnection);
        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}
