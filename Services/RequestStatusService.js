const { fileNanme, logger } = require('../log4');
const RequestStatusRepo = require('../DataBase/RequestStatusRepo');
const RequestRepo = require('../DataBase/RequestRepo');
const DB = require('../DataBase/db');

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});
let dbConnection;


exports.createRequestStatus = async(data) => {
    try {
        logger.info(`file: ${fname} createRequeststatus is called`);
        dbConnection = await DB.ConnectToDb();
        const result = await RequestRepo.createRequest(data,dbConnection);
        if (result.affectedRows == 1) {
            const statusResult = await RequestStatusRepo.addrequestStatus(dbConnection,data,result.insertId);
            if(statusResult.affectedRows == 1){
                totalresult = {"result":result,"statusResult":statusResult};
            }
        }
        console.log(result, "from service file");
        return totalresult;
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
        const result = await RequestStatusRepo.getAllRequestStatus();
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}


exports.updateRequestStatus = async(data) => {
    try {
        logger.info(`file: ${fname} createRequeststatus is called`);
        dbConnection = await DB.ConnectToDb();
        const result = await RequestRepo.updateRequest(data,dbConnection);
        console.log(result,"from updateRequestStatus after uppdating request")
        if (result.affectedRows == 1) {
            const statusResult = await RequestStatusRepo.addrequestStatus(dbConnection,data,data.requestid);
            if(statusResult.affectedRows == 1){
                totalresult = {"result":result,"statusResult":statusResult};
            }
        }
        console.log(result, "from service file");
        return totalresult;
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

exports.editrequestStatus = async(data) => {
    try {
        logger.info(`file: ${fname} editrequestStatus is called`);
        const result = await RequestStatusRepo.editrequestStatus(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err; 
    }
}
