const { fileNanme, logger } = require('../log4');
const DetailRepo = require('../DataBase/ListDataDetailRepo')
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

exports.addDetailData = async(data) => {
    try {
        logger.info(`file: ${fname} addDetailData is called`);
        const dbConnection = await DB.ConnectToDb();
        
        const result = await DetailRepo.addDetailData(data,dbConnection);

        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}

exports.deleteDetailbyMasterId = async(data) => {
    try {
        logger.info(`file: ${fname} deleteMasterbyId is called`);
        const dbConnection = await DB.ConnectToDb();
        const result = await DetailRepo.deleteMasterbyId(data,dbConnection);
        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}

exports.deleteDetailbyDetailId = async(data) => {
    try {
        logger.info(`file: ${fname} deleteDetailbyDetailId is called`);
        const dbConnection = await DB.ConnectToDb();
        const result = await DetailRepo.deleteDetailbyDetailId(data,dbConnection);
        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}

exports.getDescByListCode = async(data) =>{
    try {
        logger.info(`file: ${fname} getDescByListCode  is called`);
        const dbConnection = await DB.ConnectToDb();
        const result = await DetailRepo.getDescByListCode(data,dbConnection);
        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}