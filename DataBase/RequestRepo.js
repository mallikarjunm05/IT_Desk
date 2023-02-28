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
        if(data.backup == 1 && data.downtime ==1){
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,backupdate,downtimenotifydate) VALUES ('${data.createdby}', '${data.createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${data.scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${data.backupdae}','${data.downtimenotifydate}');`
            return query;
        }
        else if(data.backup == 1 && data.downtime ==0){
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,backupdate) VALUES ('${data.createdby}', '${data.createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${data.scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${data.backupdae}');`
            return query;
        }
        else if(data.backup == 0 && data.downtime ==1){
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,downtimenotifydate) VALUES ('${data.createdby}', '${data.createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${data.scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${data.downtimenotifydate}');`
            return query;
        }
        else{
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status) VALUES ('${data.createdby}', '${data.createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${data.scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open');`
            return query;
        }
    }
    catch (err) {
        throw err;
    }
}

exports.getAllRequests = async () => {
    try {
        logger.info(`file: ${fname} getAllRequests is called`);
        let query = `select * from  requestdetails left join requeststatus on requestdetails.requestid = requeststatus.requestid  `;
        dbConnection = await DB.ConnectToDb();
        let result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, "result from table");
        return result;
    }
    catch (err) {
        console.log(err, "getAllRequests");
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
    finally {
        dbConnection.release();
    }
}

exports.updateRequest = async (data) => {
    try {
       if(data.reqstatus == "draft" || "newrequest"){
        dbConnection = await DB.ConnectToDb();
        logger.info(`file: ${fname} updateRequest is called`);
        let query = `update requestdetails set createdby = '${data.createdby}', createddate='${data.createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',
         implemettime='${data.implemettime}', scheduleddate='${data.scheduleddate}', reqstatus='${reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${data.backup}, downtime=${data.downtime},empid=${data.empid}
         where requestid= ${data.requestid}`;
         let result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, "result from table");
        return result;
       }
        
    }
    catch (error) {
        console.log(error, "from updateRequest");
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
    finally {
        dbConnection.release();
    }
}

