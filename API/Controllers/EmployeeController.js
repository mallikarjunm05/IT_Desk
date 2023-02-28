const { fileNanme, logger } = require('../../log4');
const EmployeeServices = require('../../Services/EmployeeServices')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

const addEmployee = async(req,res) => {
    try {
        logger.info(`file: ${fname} addEmployee is called`);
        let result = await EmployeeServices.addEmployee(req);
        
        res.send({"Status": {
             StatusCode: 200,
             StatusType: "Success",
             StatusMessage: "Record Added",
             StatusSeverity: "Information",
            },
             result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":err}});
    }
}

const getEmployees = async(req,res) => {
    try {
        logger.info(`file: ${fname} getEmployees is called`);
        let result = await EmployeeServices.getEmployees(req);
        res.send({"Status": {
            StatusCode: 200,
            StatusType: "Success",
            StatusMessage: "Records found",
            StatusSeverity: "Information",
           },
            result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":err}});
    }
}


const getEmployeeById = async(req,res) => {
    try {
        logger.info(`file: ${fname} getEmployeeById is called`);
        let result = await EmployeeServices.getEmployeeById(req);
        res.send({"Status": {
            StatusCode: 200,
            StatusType: "Success",
            StatusMessage: "Records found",
            StatusSeverity: "Information",
           },
            result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":err}});
    }
}

const deleteEmployeeById = async(req,res) => {
    try {
        logger.info(`file: ${fname} deleteEmployeeById is called`);
        let result = await EmployeeServices.deleteEmployeeById(req);
        res.send({"Status": {
            StatusCode: 200,
            StatusType: "Success",
            StatusMessage: "Record deleted",
            StatusSeverity: "Information",
           },
            result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":err}});
    }
}

const EditEmployeedetails = async(req,res) => {
    try {
        logger.info(`file: ${fname} EditEmployeedetails is called`);
        let result = await EmployeeServices.EditEmployeedetails(req);
        res.send({"Status": {
            StatusCode: 200,
            StatusType: "Success",
            StatusMessage: "Record updated",
            StatusSeverity: "Information",
           },
            result});
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":err}});
    }
}

const empFilter = async(req,res) => {
    try {
        logger.info(`file: ${fname} empFilter is called`);
        let result = await EmployeeServices.empFilter(req);
          if(result != undefined){
            res.send({"Status": {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "Records found ",
                StatusSeverity: "Information",
               },
                result});
          }
          else{
            err = "no result from employee repo";
            throw  err ;
          }
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":`${err}`}});
    }
}

module.exports = { addEmployee, getEmployees ,getEmployeeById, deleteEmployeeById,EditEmployeedetails,empFilter};
