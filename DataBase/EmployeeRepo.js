const { fileNanme, logger } = require('../log4');
const DB = require('./db')
var fname;
let dbConnection;
fileNanme(__filename).then((data) => {
    fname = data;
});
exports.getEmployeesRepo = async () => {
    try {
        logger.info(`file: ${fname} getEmployeesRepo is called`);
        dbConnection = await DB.ConnectToDb();
        let result = await DB.ExecuteQuery(dbConnection, 'select * from empdetails');
        return result;
    }
    catch (err) {
        console.log(err, "err from getEmployeesRepo");
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}
exports.addEmployeeDb = async (data) => {
    try {
        let empid = data.body.empid;
        let empname = data.body.empname;
        let empemailid = data.body.empemailid
        let emplevel = data.body.emplevel;
        let device = data.body.device;
        let mgremailid = data.body.mgremailid;
        let mgrempid = data.body.mgrempid;
        let mgrname = data.body.mgrname;
        logger.info(`file: ${fname} addEmployeeDb is called`);
        dbConnection = await DB.ConnectToDb();
        let query;
        if(emplevel ==  "Manager" || emplevel == "manager" ){
            query = `insert into empdetails values(${empid},'${empname}','${empemailid}','${emplevel}','${device}') `;
        }
        else if(emplevel == "CAB Manager" || emplevel == "CAB manager"){
            query = `insert into empdetails values(${empid},'${empname}','${empemailid}','${emplevel}','${device}') `;
        }
        else{
            query = `insert into empdetails values(${empid},'${empname}','${empemailid}','${emplevel}','${device}','${mgremailid}',${mgrempid},'${mgrname}') `;
        }
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log(err, "err from addEmployeeDb");
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}
exports.getEmployeeById = async (data) => {
    try {
        let empid = data.body.empid;
        logger.info(`file: ${fname} getEmployeeById is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `select * from empdetails where empid=${empid}`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log("error from getEmployeeById", err);
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}

exports.deleteEmployeeById = async (data) => {
    try {
        let empid = data.body.empid;
        logger.info(`file: ${fname} deleteEmployeeById is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `delete from empdetails where empid=${empid}`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log("error from deleteEmployeeById", err);
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}
exports.EditEmployeedetails = async (data) => {
    try {
        let empid = data.body.empid;
        let empname = data.body.empname;
        let empemailid = data.body.empemailid
        let emplevel = data.body.emplevel;
        let device = data.body.device;
        let mgremailid = data.body.mgremailid;
        let mgrempid = data.body.mgrempid;
        let mgrname = data.body.mgrname;
        logger.info(`file: ${fname} EditEmployeedetails is called`);
        dbConnection = await DB.ConnectToDb();
        let query;
        if(emplevel == "Manager" || emplevel == "CAB Manager"){
            query = `update empdetails set empname= '${empname}',empemailid='${empemailid}',emplevel='${emplevel}',device='${device}' where empid = ${empid}`;
        }
        else{
            query = `update empdetails set empname= '${empname}',empemailid='${empemailid}',emplevel='${emplevel}',device='${device}',mgremailid='${mgremailid}',mgrempid=${mgrempid},mgrname='${mgrname}' where empid = ${empid}`;
        }
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log(err, "err from EditEmployeedetails");
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}
exports.empFilter = async (data) => {
    dbConnection = await DB.ConnectToDb();
    try {
        let filterobj = data.body;
        let request = {};
        let queryString = ` select * from empdetails where `;
        let string = '';
        for (let key in filterobj) {
            if (filterobj != "" || 0) {
                console.log(key, "key");
                request[key] = filterobj[key];
            }
        }
        let count = 0;
        for (const key in request) {
            if (key == "empname" && request[key].length > 0) {
                let element = request[key];
                string = key + ' like ' + `'${request[key]}%'`;
                count++;
            }
            else if (key == "empemailid" && request[key].length > 0) {
                string = key + ' like ' + `'${request[key]}%'`;
                count++;
            }
            else if (key == "emplevel" && request[key].length > 0) {
                string = key + ' like ' + `'${request[key]}%'`;
                count++;
            }
            else if (key == "mgrname" && request[key].length > 0) {
                string = key + ' like ' + `'${request[key]}%'`;
                count++;
            }
            else if (key == "mgrempid" && request[key].length > 0) {
                string = key + ' = ' + `${request[key]}`;
                count++;
            }
            else {   /** if there is no match*/
                string = 'empid != 0';
                count++;
            }
            if (Object.keys(request).length != count) {
                queryString = queryString + string + " AND ";
            } else {
                queryString = queryString + string + "  ";
            }
        }
        console.log("query is : \n ", queryString);
        let result = await DB.ExecuteQuery(dbConnection, queryString);
        return result;
    }
    catch (err) {
        console.log(err, "error from empFilter");
        logger.fatal(`file: '${fname}',error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}
exports.getEmployeeIdByDevice = async (data) => {
    try {
        let device = data.body.device;
        logger.info(`file: ${fname} getEmployeeIdByDevice is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `select empid from empdetails where device='${device}' and emplevel='Manager'`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log("error from getEmployeeById", err);
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}
exports.getEmployeeNameById = async (data) => {
    try {
        let empid = data.body.empid;
        logger.info(`file: ${fname} getEmployeeNameById is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `select empname from empdetails where empid=${empid}`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log("error from getEmployeeById", err);
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}