const { fileNanme, logger } = require('../log4');
const DB = require('../DataBase/db');

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});
let dbConnection;

async function dateformat(date){
    
   if(date){
    let d = new Date(date);
    let newdate = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2) ;
    return newdate;
   }
   else return "1999-01-01";
}

exports.getAllRequestStatus = async () => {
    try {
        logger.info(`file: ${fname} getAllRequestStatus is called`);
        let query = `select * from  requeststatus `;
        dbConnection = await DB.ConnectToDb();
        let result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, "result from table");
        return result;
    }
    catch (err) {
        console.log(err,"from getAllRequestStatus");
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
        let statusdate = await dateformat(data.createddate);
        const query = `insert into requeststatus(requestid,empid,status,statusdate) values(${requestid},${data.empid},'${data.reqstatus}','${statusdate}')`;
        result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, " from Repo file");

        return result;
    }
    catch (err) {
        console.log(err, "from addrequestStatus");
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
}

exports.editrequestStatus = async (dbConnection, data) => {
    try {
        logger.info(`file: ${fname} editrequestStatus is called`);
        let result;
        console.log(data, "from api ");
        const query = `update requeststatus set requestid = ${data.requestid},empid = ${data.empid},status='${data.reqstatus}',statusdate='${data.createddate}' where statusid = ${data.statusid}`;
        result = await DB.ExecuteQuery(dbConnection, query);
        console.log(result, " from Request status Repo file");

        return result;
    }
    catch (err) {
        console.log(err, "from editrequestStatus");
        logger.fatal(`file: ${fname},error: ${err}`);
        throw err;
    }
}

/************************ */

// const { fileNanme, logger } = require('../log4');
// const DB = require('../DataBase/db');

// var fname;

// fileNanme(__filename).then((data) => {
//     fname = data;
// });
// let dbConnection;

// async function dateformat(date){
    
//    if(date){
//     let d = new Date(date);
//     let newdate = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2) ;
//     return newdate;
//    }
//    else return "1999-01-01";
// }

// exports.getAllRequestStatus = async () => {
//     try {
//         logger.info(`file: ${fname} getAllRequestStatus is called`);
//         let query = `select * from  requeststatus `;
//         dbConnection = await DB.ConnectToDb();
//         let result = await DB.ExecuteQuery(dbConnection, query);
//         console.log(result, "result from table");
//         return result;
//     }
//     catch (err) {
//         console.log(err,"from getAllRequestStatus");
//         logger.fatal(`file: ${fname},error: ${err}`);
//         throw err;
//     }
//     finally {
//         dbConnection.release();
//     }
// }

// exports.addrequestStatus = async (dbConnection, data, requestid) => {
//     try {
//         logger.info(`file: ${fname} addrequestStatus is called`);
//         let result;
//         console.log(data, "from api ");
//         let statusdate = await dateformat(data.createddate);
//         const query = `insert into requeststatus(requestid,empid,status,statusdate) values(${requestid},${data.empid},'${data.reqstatus}','${statusdate}')`;
//         result = await DB.ExecuteQuery(dbConnection, query);
//         console.log(result, " from Repo file");

//         return result;
//     }
//     catch (err) {
//         console.log(err, "from addrequestStatus");
//         logger.fatal(`file: ${fname},error: ${err}`);
//         throw err;
//     }
// }

// exports.editrequestStatus = async (dbConnection, data) => {
//     try {
//         logger.info(`file: ${fname} editrequestStatus is called`);
//         let result;
//         console.log(data, "from api ");
//         const query = `update requeststatus set requestid = ${data.requestid},empid = ${data.empid},status='${data.reqstatus}',statusdate='${data.createddate}' where statusid = ${data.statusid}`;
//         result = await DB.ExecuteQuery(dbConnection, query);
//         console.log(result, " from Request status Repo file");

//         return result;
//     }
//     catch (err) {
//         console.log(err, "from editrequestStatus");
//         logger.fatal(`file: ${fname},error: ${err}`);
//         throw err;
//     }
// }