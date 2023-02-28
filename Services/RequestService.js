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
        logger.info(`file: ${fname} getAllRequest is called`);
        const result = await RequestRepo.getAllRequests();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}

