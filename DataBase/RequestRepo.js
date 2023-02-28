const { fileNanme, logger } = require('../log4');
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});
let dbConnection;

exports.createRequest = async (data, dbConnection) => {
    try {
        logger.info(`file: ${fname} createRequest is called`);
        let result;
        console.log(data, "from api ");
        const query = await prepareCreateRequestQuery(data);
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

async function prepareCreateRequestQuery(data) {
    try {
        const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid) VALUES ('${data.createdby}', '${data.createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${data.scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid});`
        return query;
    }
    catch (err) {
        throw err;
    }
}

exports.getAllRequests = async () => {
    try {
        logger.info(`file: ${fname} getAllRequests is called`);
        let query = `select * from  requestdetails left join requeststaus on requestdetails.requestid = requeststaus.requestid  `;
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


