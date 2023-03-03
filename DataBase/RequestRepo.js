const { fileNanme, logger } = require('../log4');
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});
let dbConnection;

async function dateformat(date) {

    let d = new Date(date);
    let newdate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    return newdate;
}

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
        console.log(err, "from create request repo");
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
}

async function prepareCreateRequestQuery(data) {
    try {
        data.empid = parseInt(data.empid);
        data.backup = parseInt(data.backup);
        data.downtime = parseInt(data.downtime);

        let createddate = await dateformat(data.createddate);
        let scheduleddate = await dateformat(data.scheduleddate);

        console.log(createddate, scheduleddate, "formatted date");
        if (data.backup == 1 && data.downtime == 1) {
            let downtimenotifydate = await dateformat(data.downtimenotifydate);
            let backupdate = await dateformat(data.backupdate);
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,backupdate,downtimenotifydate) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${backupdate}','${downtimenotifydate}')`
            return query;
        }
        else if (data.backup == 1 && data.downtime == 0) {
            let backupdate = await dateformat(data.backupdate);
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,backupdate) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${backupdate}')`
            return query;
        }
        else if (data.backup == 0 && data.downtime == 1) {
            let downtimenotifydate = await dateformat(data.downtimenotifydate);
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,downtimenotifydate) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${downtimenotifydate}')`
            return query;
        }
        else {
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open')`
            return query;
        }
    }
    catch (err) {
        throw err;
    }
}

exports.getAllRequests = async () => {
    dbConnection = await DB.ConnectToDb();
    try {
        logger.info(`file: ${fname} getAllRequests is called`);
        let query = `select requestid,createdby, DATE_FORMAT(createddate,'%d/%m/%Y') AS createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime,DATE_FORMAT(scheduleddate,'%d/%m/%Y') AS scheduleddate , reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,DATE_FORMAT(backupdate,'%d/%m/%Y') AS backupdate, DATE_FORMAT(downtimenotifydate,'%d/%m/%Y') AS downtimenotifydate  from  requestdetails `;
       
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

        dbConnection = await DB.ConnectToDb();
        logger.info(`file: ${fname} updateRequest is called`);
        let result;
        if (data.reqstatus == "draft" || "new request") {
            const query = await updateRequestQuery(data);
            result = await DB.ExecuteQuery(dbConnection, query);

        }
        else if (data.reqstatus == "manager approved" || "CAB manager approved") {
            const query = await updateApprovedRequestQuery(data);
            result = await DB.ExecuteQuery(dbConnection, query);
        }
        else if (data.reqstatus == "manager rejected") {
            const query = await updateManagerRejectedQuery(data);
            result = await DB.ExecuteQuery(dbConnection, query);
        }
        else {
            if (data.reqstatus == "CAB manager rejected") {
                const query = await updateCABManagerRejectedRequestQuery(data);
                result = await DB.ExecuteQuery(dbConnection, query);
            }
            else {
                const query = await updateClosedRequestQuery(data);
                result = await DB.ExecuteQuery(dbConnection, query);
            }
        }

        console.log(result, "result from table");
        return result;

    }
    catch (error) {
        console.log(error, "from updateRequest");
        logger.fatal(`file: ${fname},error: ${error}`);
        throw error;
    }
    finally {
        dbConnection.release();
    }
}

async function updateApprovedRequestQuery(data) {
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}' where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateClosedRequestQuery(data) {
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}',status = "closed" where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateCABManagerRejectedRequestQuery(data) {
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}',status = "closed", rejreason=${data.rejreason} where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateRequestQuery(data) {
    try {
        let backup = parseInt(data.backup);
        let downtime = parseInt(data.downtime);

        let createddate = await dateformat(data.createddate);
        let scheduleddate = await dateformat(data.scheduleddate);

        if (backup == 1 && downtime == 1) {
            let downtimenotifydate = await dateformat(data.downtimenotifydate);
            let backupdate = await dateformat(data.backupdate);
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid} where requestid= ${data.requestid}`;
            return query;
        }
        else if (backup == 1 && downtime == 0) {

            let backupdate = await dateformat(data.backupdate);
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid} ,backupdate='${backupdae}' where requestid= ${data.requestid}`;
            return query;
        }
        else if (backup == 0 && downtime == 1) {
            let downtimenotifydate = await dateformat(data.downtimenotifydate);
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}', implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid} ,downtimenotifydate='${downtimenotifydate}' where requestid= ${data.requestid}`;
            return query;
        }
        else {
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid} where requestid= ${data.requestid}`;
            return query;
        }
    }
    catch (err) {
        throw err;
    }
}

async function updateManagerRejectedQuery(data) {
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}', rejreason=${data.rejreason} where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.requestdetailsFilter = async (data) => {
    dbConnection = await DB.ConnectToDb();
    try {
        let filterobj = data.body;
        console.log(filterobj, "filterobj");
        let request = {};
        let queryString = ` select requestid,createdby, DATE_FORMAT(createddate,'%d/%m/%Y') AS createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime,DATE_FORMAT(scheduleddate,'%d/%m/%Y') AS scheduleddate , reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,DATE_FORMAT(backupdate,'%d/%m/%Y') AS backupdate, DATE_FORMAT(downtimenotifydate,'%d/%m/%Y') AS downtimenotifydate  from  requestdetails where `;
        let string = '';
        let nextdate ;
        for (let key in filterobj) {
            if (filterobj != "" || 0) {
                console.log(key, "key");
                request[key] = filterobj[key];
            }
        }

        let count = 0;
        for (let key in request) {

            if (key == "createdby" && request[key].length > 0) {

                string = key + ' like ' + `'${request[key]}%'`;
                count++;

            }
            else if (key == "reqstatus" && request[key].length > 0) {

                string = key + ' like ' + `'${request[key]}%'`;
                count++;

            }
            else if (key == "status" && request[key].length > 0) {

                string = key + ' like ' + `'${request[key]}%'`;
                count++;

            }
            else if (key == "type" && request[key].length > 0) {

                string = key + ' like ' + `'${request[key]}%'`;
                count++;

            }
            else if (key == "createddate" ) {

                let createddate = await dateformat(request[key]);
                    
                string = key + ' = ' + `'${createddate}'`;
                count++;

            }
            else if (key == "scheduleddate" ) {

                let scheduleddate = await dateformat(request[key]);
                string = key + ' = ' + `'${scheduleddate}'`;
                count++;

            }
            else if (key == "priority" && request[key].length>0) {

                string = key + ' = ' + `'${request[key]}'`;
                count++;

            }
            else if (key == "devicetyp" && request[key].length>0) {

                string = key + ' = ' + `'${request[key]}'`;
                count++;

            }
            else {   /** if there is no match*/

                string = 'requestid != 0 ';
                count++;
            }

            if (Object.keys(request).length != count) {
                queryString = queryString + string + " AND ";
            } else {
                queryString = queryString + string + " ";
            }
        }

        console.log("query is : \n ", queryString);
        let result = await DB.ExecuteQuery(dbConnection, queryString);
        return result;
    }
    catch (err) {
        console.log(err, "error from requestdetailsFilter");
        logger.fatal(`file: '${fname}',error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}

exports.getRequestbyId = async(data)=>{
    dbConnection = await DB.ConnectToDb();
    try {
        let requestid = parseInt(data.requestid);

        let queryString = ` select requestid,createdby, DATE_FORMAT(createddate,'%d/%m/%Y') AS createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime,DATE_FORMAT(scheduleddate,'%d/%m/%Y') AS scheduleddate , reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,DATE_FORMAT(backupdate,'%d/%m/%Y') AS backupdate, DATE_FORMAT(downtimenotifydate,'%d/%m/%Y') AS downtimenotifydate  from  requestdetails where requestid = ${requestid}`;
        let result = await DB.ExecuteQuery(dbConnection, queryString);
        return result;
    } catch (error) {
        console.log(error,"from get request by id");
        throw error;
    }
    finally{
        dbConnection.release();
    }
}