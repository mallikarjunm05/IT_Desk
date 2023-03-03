
const { fileNanme, logger } = require('../log4');
const DB = require('./db')

var fname;
let dbConnection;

fileNanme(__filename).then((data) => {
    fname = data;
});

exports.getLocation = async() =>{
    try {
        logger.info(`file: ${fname} getLocation is called`);
        dbConnection = await DB.ConnectToDb();
        let result = await DB.ExecuteQuery(dbConnection, 'select * from  location');
        return result;
    }
    catch (err) {
        console.log(err, "err from getLocation");
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}


exports.addLocation = async (data) => {
    try {
        let locationid = data.body.locationid;
        let locname = data.body.locname;
        let state = data.body.state
        let country = data.body.country;
        let zipcode = data.body.zipcode;

        logger.info(`file: ${fname} addLocation is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `insert into location values(${locationid},'${locname}','${state}','${country}',${zipcode}) `;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log(err, "err from addLocation");
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}

exports.getLocationById = async (data) => {
    try {
        let locationid = data.body.locationid;
        logger.info(`file: ${fname} getLocationById is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `select * from location where locationid=${locationid}`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log("error from getLocationById", err);
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}

exports.deleteLocationById = async (data) => {
    try {
        let locationid = data.body.locationid;
        logger.info(`file: ${fname} deleteLocationById is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `delete from location where empid=${locationid}`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log("error from deleteLocationById", err);
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}

exports.EditLocationdetails = async (data) => {
    try {
        let locationid = data.body.locationid;
        let locname = data.body.locname;
        let state = data.body.state
        let country = data.body.country;
        let zipcode = data.body.zipcode;

        logger.info(`file: ${fname} EditLocationdetails is called`);
        dbConnection = await DB.ConnectToDb();
        let query = `update location set locname= '${locname}',state='${state}',country='${country}',zipcode=${zipcode} where locationid = ${locationid}`;
        let result = await DB.ExecuteQuery(dbConnection, query);
        return result;
    }
    catch (err) {
        console.log(err, "err from EditLocationdetails");
        logger.fatal(`file: ${fname},error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}

exports.locationFilter = async (data) => {
    dbConnection = await DB.ConnectToDb();
    try {
        let filterobj = data.body.filter
        let request = {};
        let queryString = ` select * from location where `;
        let string = '';

        for (let key in filterobj) {
            if (filterobj != '' || 0) {
                console.log(key, "key");
                request[key] = filterobj[key];
            }
        }

        let count = 0;
        for (const key in request) {
            if (key == "locationid") {
                let element = request[key];
                if (element != '') {
                    string = key + ' = ' + `${request[key]}`;
                    count++;
                }
            }
            else if (key == "locname") {
                let element = request[key];
                if (element != '') {
                    string = key + ' like ' + `'${request[key]}%'`;
                    count++;
                }
            }
            else if (key == "state") {
                let element = request[key];
                if (element != '') {
                    string = key + ' like ' + `'${request[key]}%'`;
                    count++;
                }
            }
            else if (key == "country") {
                let element = request[key];
                if (element != '') {
                    string = key + ' like ' + `'${request[key]}%'`;
                    count++;
                }
            }
            else if (key == "zipcode") {
                let element = request[key];
                if (element != '') {
                    string = key + ' = ' + `${request[key]}`;
                    count++;
                }
            }
            else {   /** if there is no match*/
                string = 'country = "India"';
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
        console.log(err, "error from locationFilter");
        logger.fatal(`file: '${fname}',error: ${err}`);
    }
    finally {
        dbConnection.release();
    }
}