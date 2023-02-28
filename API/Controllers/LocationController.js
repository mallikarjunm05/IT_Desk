const { fileNanme, logger } = require('../../log4');
const LocationService = require('../../Services/LocationServices')

var fname;

fileNanme(__filename).then((data)=>{
    fname = data;
});

const addLocation = async(req,res) => {
    try {
        logger.info(`file: ${fname} addLocation is called`);
        let result = await LocationService.addLocation(req);
        
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

const getLocation = async(req,res) => {
    try {
        logger.info(`file: ${fname} getLocation is called`);
        let result = await LocationService.getLocation(req);
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


const getLocationById = async(req,res) => {
    try {
        logger.info(`file: ${fname} getLocationById is called`);
        let result = await LocationService.getLocationById(req);
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

const deleteLocationById = async(req,res) => {
    try {
        logger.info(`file: ${fname} deleteLocationById is called`);
        let result = await LocationService.deleteLocationById(req);
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

const EditLocationdetails = async(req,res) => {
    try {
        logger.info(`file: ${fname} EditLocationdetails is called`);
        let result = await LocationService.EditLocationdetails(req);
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

const locationFilter = async(req,res) => {
    try {
        logger.info(`file: ${fname} locationFilter is called`);
        let result = await LocationService.locationFilter(req);
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
            err = "no result from location repo";
            throw  err ;
          }
    }
    catch(err){
        logger.fatal(`file: ${fname},error: ${err}`); 
        res.status(500).json({"status":{"statuscode":500,"statusType":"failure","error":`${err}`}});
    }
}

module.exports = { addLocation,getLocation,getLocationById,EditLocationdetails,deleteLocationById,locationFilter};
