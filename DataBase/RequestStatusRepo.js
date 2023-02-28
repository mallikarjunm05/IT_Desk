const { fileNanme, logger } = require('../log4');
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});
let dbConnection;


exports.getAllRequestStatus = async () => {
    try {
        logger.info(`file: ${fname} getAllRequestStatus is called`);
        let query = `select * from  requeststaus `;
        dbConnection = await DB.ConnectToDb();
        let result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, "result from table");
        return result;
    }
    catch (err) {
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
    finally {
        dbConnection.release();
    }
}

exports.addrequestStatus = async (dbConnection, data, requestid) => {
    try {
        logger.info(`file: ${fname} addrequestStatus is called`);
        let result;
        console.log(data, "from api ");
        const query = `insert into requeststaus(requestid,empid,status,statusdate) values(${requestid},${data.empid},'${data.reqstatus}','${data.createddate}')`;
        result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, " from Repo file");

        return result;
    }
    catch (err) {
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
}

