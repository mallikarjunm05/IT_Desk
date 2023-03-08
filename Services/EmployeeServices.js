const { fileNanme, logger } = require('../log4');
const EmployeeRepo = require('../DataBase/EmployeeRepo')


var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

exports.addEmployee = async(data) => {
    try {
        logger.info(`file: ${fname} addEmployee is called`);
        let result = await EmployeeRepo.addEmployeeDb(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}
exports.getEmployees = async(data) => {
    try {
        logger.info(`file: ${fname} getEmployess is called`);
        let result = await EmployeeRepo.getEmployeesRepo();
        return result;
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        console.log(err);
    }
}

exports.getEmployeeById = async(data) => {
    try {
        logger.info(`file: ${fname} getEmployeeById is called`);
        let result = await EmployeeRepo.getEmployeeById(data);
        return result;
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        console.log(err);
    }
}

exports.deleteEmployeeById = async(data) => {
    try {
        logger.info(`file: ${fname} deleteEmployeeById is called`);
        let result = await EmployeeRepo.deleteEmployeeById(data);
        return result;
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        console.log(err);
    }
}

exports.EditEmployeedetails = async(data) => {
    try {
        logger.info(`file: ${fname} EditEmployeedetails is called`);
        let result = await EmployeeRepo.EditEmployeedetails(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}

exports.empFilter = async(data) => {
    try {
        logger.info(`file: ${fname} empFilter is called`);
        let result = await EmployeeRepo.empFilter(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}

exports.getEmployeeIdByDevice = async(data) => {
    try {
        logger.info(`file: ${fname} getEmployeeIdByDevice is called`);
        let result = await EmployeeRepo.getEmployeeIdByDevice(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}

exports.getEmployeeNameById = async(data) => {
    try {
        logger.info(`file: ${fname} getEmployeeNameById is called`);
        let result = await EmployeeRepo.getEmployeeNameById(data);
        return result;
    }
    catch(err){
        console.log(err);
        logger.fatal(`file: ${fname},error: ${err}`); 
    }
}