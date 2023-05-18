const { fileNanme, logger } = require('../../log4');
const RequestServices = require('../../Services/RequestService');
const RequestStatusService = require('../../Services/RequestStatusService');
const emailservice = require('../../EmailServices/emailConfig');
const empdetails = require('../../Services/EmployeeServices');
const empRepo = require('../../DataBase/EmployeeRepo');
var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});

const createRequest = async (req, res) => {
    try {
        logger.info(`file: ${fname} createRequest is called`);
        result = await RequestStatusService.createRequestStatus(req.body);
        console.log(result, "from controller");
        if (result.result.affectedRows == 1 && req.body.reqstatus == "Draft") {
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request Created with status draft Succesfully!!",
                    StatusSeverity: "Information",
                },
                result
            });
        }
        else if (result.result.affectedRows == 1 && req.body.reqstatus == "New Request") {
            //send response
            logger.info(`file: ${fname} , statuscode : 200`)

            let data = { body: {} };

            data.body.empid = req.body.empid;
            let empdetail = await empdetails.getEmployeeById(data);
            req.body.empdetail = empdetail[0];
            req.body.requestid = req.body.ticketNumber;
            console.log(req.body.empdetail.mgrname);
            //send email

                emailservice.sendemail(req.body,req.body.empdetail.mgremailid);
            //    child.on("message",async(msg)=>{
            //        result.emailservice = msg ;
            //   });
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request Created with status newrequest Succesfully!!",
                    StatusSeverity: "Information",
                },
                result
            });
        }
        else {
            res.status(500).json({ err: 'Could not create request' });
        }
    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from controller");
        res.status(500).json({ err });
    }
}
const getAllRequests = async (req, res) => {
    try {
        logger.info(`file: ${fname} getAllRequests is called`);
        const result = await RequestServices.getAllRequests();
        logger.info(`file: ${fname} , statuscode : 200`)
        res.status(200).json({
            Status: {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "Change Request Created Succesfully!!",
                StatusSeverity: "Information",
            },
            result: result
        });
    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from get all requests")
        res.status(500).json({ error: err });
    }
}
const UpdateRequest = async (req, res) => {
    try {
        console.log(req.server);
        logger.info(`file: ${fname} updateRequest is called`);
        result = await RequestStatusService.updateRequestStatus(req.body);
        console.log(result, "from Request controller");
        if (result.result.affectedRows == 1 && req.body.reqstatus == "Draft") {
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request updated with status draft Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
        }
        else if (result.result.affectedRows == 1 && req.body.reqstatus == "New Request") {
            //send response
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request updated with status Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            //send email
            let data = { body: {} }
            data.body.empid = req.body.empid;
            let empdetail = await empdetails.getEmployeeById(data);
            req.body.empdetail = empdetail[0];
            req.body.requestid = req.body.requestid;
            console.log(req.body.empdetail.mgrname);
            //send email function
           emailservice.sendemail(req.body,req.body.empdetail.mgremailid);
        }
        else if (result.result.affectedRows == 1 && req.body.reqstatus == "Manager Rejected") {
            //send response
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request updated with status Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            //send email
            let data={body:{}}
            data.requestid = req.body.requestid;
            let requestdetails = await RequestServices.getRequestbyId(data);
            console.log(requestdetails,"ticket details");
            req.body = {...requestdetails[0]}
            console.log(req.body,"empid body");
            // console.log(ticketdetails[0].createdby,"created by");
            let empdetail = await empRepo.getEmployeeById(req);
            req.body.empdetail = empdetail[0];
            console.log(empdetail,"emp details");
            //send email function
               emailservice.sendemail(req.body,requestdetails[0].createdby);
            // emailservice.sendemail(req.body, req.body.empdetail.createdby);
        }
        else if (result.result.affectedRows == 1 && req.body.reqstatus == "Manager Approved") {
            //send response
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request updated with status Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            //send email
            let data={body:{}}
            data.requestid = req.body.requestid;
            let requestdetails = await RequestServices.getRequestbyId(data);
            console.log(requestdetails[0].approveremail,"manager email id from request api");
            data.body.empemailid =requestdetails[0].approveremail;
           
            let empdetail = await empRepo.getEmployeeByEmail(data);
            console.log(empdetail,"empdetails");
            req.body = {...requestdetails[0]};
            req.body.empdetail = empdetail[0];
            console.log(req.body, "req.body");

            //send email function
                emailservice.sendemail(req.body,process.env.CABMailId);
        }
        else if (result.result.affectedRows == 1 && req.body.reqstatus == "CAB Approved") {
            //send response
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request updated with status Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            //send email
            let data={body:{}}
            data.requestid = req.body.requestid;
            let requestdetails = await RequestServices.getRequestbyId(data);
            req.body = {...requestdetails[0]};
            console.log(req.body,"req.body from requsetcontroller ")

            //send email function
                emailservice.sendemail(req.body,req.body.createdby);
            //    emailservice.sendemail(req.body,req.body.empdetail.createdby);
        }
        else if( result.result.affectedRows == 1 && req.body.reqstatus == "CAB Rejected"){
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request updated with status Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            //send email
            let data={body:{}}
            data.requestid = req.body.requestid;
            let requestdetails = await RequestServices.getRequestbyId(data);
            req.body = {...requestdetails[0]};
            console.log(req.body,"req.body for cab rejected");
            //send email function
               emailservice.sendemail(req.body,req.body.createdby);
        }
        else {
            logger.info(`file: ${fname} , statuscode : 200`)
            let err = "request not updated";
            throw err;
            // res.status(200).json({
            //     Status: {
            //         StatusCode: 200,
            //         StatusType: "Success",
            //         StatusMessage: "Change Request updated with status newrequest Succesfully!!",
            //         StatusSeverity: "Information",
            //     }
            // });
        }
    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from controller");
        res.status(500).json({ err });
    }
}
const getfilteredRequests = async (req, res) => {
    try {
        logger.info(`file: ${fname} getfilteredRequests is called`);
        const result = await RequestServices.getfilteredRequests(req);
        logger.info(`file: ${fname} , statuscode : 200`)
        res.status(200).json({
            Status: {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "request details found Succesfully!!",
                StatusSeverity: "Information",
            },
            result: result
        });
    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from get filtered requests")
        res.status(500).json({ error: err });
    }
}


const getRequestbyId = async (req, res) => {
    try {
        logger.info(`file: ${fname} getRequestbyId is called`);
        const result = await RequestServices.getRequestbyId(req.body);
        logger.info(`file: ${fname} , statuscode : 200`)
        res.status(200).json({
            Status: {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "request detail found Succesfully!!",
                StatusSeverity: "Information",
            },
            result: result
        });
    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from get  request by id")
        res.status(500).json({ error: err });
    }
}


const getrequestId = async (req, res) => {
    try {
        logger.info(`file: ${fname} getrequestId is called`);
        const result = await RequestServices.getrequestId(req.body);
        logger.info(`file: ${fname} , statuscode : 200`)
        res.status(200).json({
            Status: {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "request detail found Succesfully!!",
                StatusSeverity: "Information",
            },
            result: result.insertId
        });
    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from get  request by id")
        res.status(500).json({ error: err });
    }
}

module.exports = { createRequest, getAllRequests, UpdateRequest, getfilteredRequests, getRequestbyId, getrequestId };