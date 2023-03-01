const { fileNanme, logger } = require('../log4');
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});
let dbConnection;

async function dateformat(date){
    
    let d = new Date(date);
    let newdate = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2) ;
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
        console.log(err ,"from create request repo");
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
}

async function prepareCreateRequestQuery(data) {
    try {
        data.backup= parseInt(data.backup);
        data.downtime= parseInt(data.downtime);
        
        let createddate = await  dateformat(data.createddate) ;
        let scheduleddate =await dateformat(data.scheduleddate);

        console.log(createddate, scheduleddate, "formatted date");
        if(data.backup == 1 && data.downtime ==1){
            let downtimenotifydate =await dateformat(data.downtimenotifydate);
            let backupdate =await dateformat(data.backupdate);
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,backupdate,downtimenotifydate) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${backupdate}','${downtimenotifydate}');`
            return query;
        }
        else if(data.backup == 1 && data.downtime ==0){
            let backupdate =await dateformat(data.backupdate);
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,backupdate) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${backupdate}');`
            return query;
        }
        else if(data.backup == 0 && data.downtime ==1){
            let downtimenotifydate =await dateformat(data.downtimenotifydate);
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status,downtimenotifydate) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open','${downtimenotifydate}');`
            return query;
        }
        else{
            const query = `INSERT INTO requestdetails (createdby, createddate, smeemailid, approveremail, type, priority, devicetype, device, sitename, location, implemettime, scheduleddate, reqstatus, justification, cmrdesc, risk, actionplan, rollbackplan, relincident, backup, downtime, empid , status) VALUES ('${data.createdby}', '${createddate}', '${data.smeemailid}', '${data.approveremail}', '${data.type}','${data.priority}','${data.devicetype}','${data.device}','${data.sitename}','${data.location}','${data.implemettime}','${scheduleddate}','${data.reqstatus}','${data.justification}','${data.cmrdesc}','${data.risk}','${data.actionplan}','${data.rollbackplan}','${data.relincident}',${data.backup},${data.downtime},${data.empid},'open');`
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
       
        dbConnection = await DB.ConnectToDb();
        logger.info(`file: ${fname} updateRequest is called`);
        let result;
        if(data.reqstatus== "draft" || "new request" ){
            const query = await updateRequestQuery(data);
         result = await DB.ExecuteQuery(dbConnection, query);

        }
        else if(data.reqstatus == "manager approved" ||  "CAB manager approved"){
            const query = await updateApprovedRequestQuery(data);
         result = await DB.ExecuteQuery(dbConnection, query);
        }
        else if(data.reqstatus == "manager rejected" ){
            const query = await updateManagerRejectedQuery(data);
            result = await DB.ExecuteQuery(dbConnection, query);
        } 
        else{
           if(data.reqstatus == "CAB manager rejected"){
            const query = await updateCABManagerRejectedRequestQuery(data);
            result = await DB.ExecuteQuery(dbConnection, query);
           }
           else{
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

async function updateApprovedRequestQuery(data){
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}'
        where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateClosedRequestQuery(data){
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}',status = "closed"
        where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateCABManagerRejectedRequestQuery(data){
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
        
        let createddate = await  dateformat(data.createddate) ;
        let scheduleddate =await dateformat(data.scheduleddate);

        if(backup == 1 && downtime ==1){
            let downtimenotifydate =await dateformat(data.downtimenotifydate);
            let backupdate =await dateformat(data.backupdate);
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',
         implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid}
         ,backupdate='${backupdae}',downtimenotifydate='${downtimenotifydate}',rejreason='${data.rejreason}
         where requestid= ${data.requestid}`;
            return query;
        }
        else if(backup == 1 && downtime ==0){

            let backupdate =await dateformat(data.backupdate);
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',
            implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid}
            ,backupdate='${backupdae}'
            where requestid= ${data.requestid}`;
            return query;
        }
        else if(backup == 0 && downtime ==1){
            let downtimenotifydate =await dateformat(data.downtimenotifydate);
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',
            implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid}
            ,downtimenotifydate='${downtimenotifydate}'
            where requestid= ${data.requestid}`;
            return query;
        }
        else{
            let query = `update requestdetails set createdby = '${data.createdby}', createddate='${createddate}', smeemailid='${data.smeemailid}', approveremail='${data.approveremail}', type='${data.type}', priority='${data.priority}', devicetype='${data.devicetype}', device='${data.device}', sitename='${data.sitename}', location='${data.location}',
            implemettime='${data.implemettime}', scheduleddate='${scheduleddate}', reqstatus='${data.reqstatus}', justification='${data.justification}', cmrdesc='${data.cmrdesc}', risk='${data.risk}', actionplan='${data.actionplan}', rollbackplan='${data.rollbackplan}', relincident='${data.relincident}', backup=${backup}, downtime=${downtime},empid=${data.empid}
            where requestid= ${data.requestid}`;
            return query;
        }
    }
    catch (err) {
        throw err;
    }
}

async function updateManagerRejectedQuery(data){
    try {
        let query = `update update requestdetails set  reqstatus='${data.reqstatus}', rejreason=${data.rejreason}

        where requestid= ${data.requestid}`
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
