const { fileNanme, logger } = require('../log4');
const DB = require('../DataBase/db')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

exports.getCodeByListDtlId = async(data,dbConnection) => {
    try {
        logger.info(`file: ${fname} getCodeByListDtlId is called`);
        const result = DB.ExecuteQuery(dbConnection,`select listdtlcode from listdatadetail where listdtlid=${data.listdtlid};`);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}

exports.getCodeByListMstId = async(data,dbConnection) => {
    try {
        logger.info(`file: ${fname} getCodeByListMstId is called`);
        const result = DB.ExecuteQuery(dbConnection,`select listdtlcode from listdatadetail where listmstid=${data.listmstid};`);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
        throw err;
    }
}

exports.addDetailData = async(data,dbConnection) => {
    try {
        logger.info(`file: ${fname} addDetailData is called`);
        const query = `INSERT INTO itdesk.listdatadetail (\`listdtlcode\`, \`listdtldesc\`, \`listmstid\`) VALUES ('${data.listdtlcode}','${data.listdtldesc}','${data.listmstid}');`
        const result = DB.ExecuteQuery(dbConnection,query);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
        throw err;
    }
}

exports.deleteDetailbyMstId = async(data,dbConnection) => {
    try {
        logger.info(`file: ${fname} deleteDetailbyMstId is called`);
        const query = `delete from listdatadetail where listdatadetail.listmstid = '${data.listmstid}';`;
        const result = DB.ExecuteQuery(dbConnection,query);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
        throw err;
    }
}

exports.deleteDetailbyDtlId = async(data,dbConnection) => {
    try {
        logger.info(`file: ${fname} deleteDetailbyDtlId is called`);
        const query = `delete from listdatadetail where listdatadetail.listdtlid = '${data.listdtlid}';`;
        const result = DB.ExecuteQuery(dbConnection,query);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
        throw err;
    }
}
