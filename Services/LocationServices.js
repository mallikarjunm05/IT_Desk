const { fileNanme, logger } = require('../log4');
const LocationRepo = require('../DataBase/LocationRepo')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

exports.addLocation = async(data) => {
    try {
        logger.info(`file: ${fname} addLocation is called`);
        let result = await LocationRepo.addLocation(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}
exports.getLocation = async(data) => {
    try {
        logger.info(`file: ${fname} getLocation is called`);
        let result = await LocationRepo.getLocation();
        return result;
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        console.log(err);
    }
}

exports.getLocationById = async(data) => {
    try {
        logger.info(`file: ${fname} getLocationById is called`);
        let result = await LocationRepo.getLocationById(data);
        return result;
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        console.log(err);
    }
}

exports.deleteLocationById = async(data) => {
    try {
        logger.info(`file: ${fname} deleteLocationById is called`);
        let result = await LocationRepo.deleteLocationById(data);
        return result;
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        console.log(err);
    }
}

exports.EditLocationdetails = async(data) => {
    try {
        logger.info(`file: ${fname} EditLocationdetails is called`);
        let result = await LocationRepo.EditLocationdetails(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}

exports.locationFilter = async(data) => {
    try {
        logger.info(`file: ${fname} locationFilter is called`);
        let result = await LocationRepo.locationFilter(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}