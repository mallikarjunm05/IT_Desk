const { fileNanme, logger } = require('../log4');
const RequestRepo = require('../DataBase/RequestRepo');
const DB = require('../DataBase/db');

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});
let dbConnection;
exports.createRequest = async(data) => {
    try {
        logger.info(`file: ${fname} createRequest is called`);
        dbConnection = await DB.ConnectToDb();

        const result = await RequestRepo.createRequest(data,dbConnection);
        console.log(result, "from service file");
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
    finally{
        dbConnection.release();
    }
}

exports.getAllRequests = async() => {
    try {
        dbConnection = await DB.ConnectToDb();
        logger.info(`file: ${fname} getAllRequest is called`);
        const result = await RequestRepo.getAllRequests(dbConnection);

        await dbConnection.release();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}


exports.updateRequest = async(data) => {
    try {
        logger.info(`file: ${fname} updateRequest is called`);
        dbConnection = await DB.ConnectToDb();

        const result = await RequestRepo.updateRequest(data,dbConnection);
        console.log(result, "from service file");
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
    finally{
        dbConnection.release();
    }
}


exports.getfilteredRequests = async(data) => {
    try {
        logger.info(`file: ${fname} getfilteredRequest is called`);
        const result = await RequestRepo.requestdetailsFilter(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}

exports.getRequestbyId = async(data) => {
    try {
        logger.info(`file: ${fname} getRequestbyId is called`);
        const result = await RequestRepo.getRequestbyId(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}



exports.getrequestId = async(data) => {
    try {
        logger.info(`file: ${fname} getrequestyId is called`);
        const result = await RequestRepo.getrequestId(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}