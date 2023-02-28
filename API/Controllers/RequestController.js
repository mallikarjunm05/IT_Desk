const { fileNanme, logger } = require('../../log4');
const RequestServices = require('../../Services/RequestService');
const RequestStatusService = require('../../Services/RequestStatusService');

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});

const createRequest = async (req, res) => {
    try {
        logger.info(`file: ${fname} createRequest is called`);
        result = await RequestStatusService.createRequestStatus(req.body);
        console.log(result,"from controller");
        if (result.result.affectedRows == 1 && req.body.reqstatus == "draft") {
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request Created with status draft Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            
        }
        else if (result.affectedRows == 1 && req.body.reqstatus == "newrequest") {
            //send response
            logger.info(`file: ${fname} , statuscode : 200`)
            res.status(200).json({
                Status: {
                    StatusCode: 200,
                    StatusType: "Success",
                    StatusMessage: "Change Request Created with status newrequest Succesfully!!",
                    StatusSeverity: "Information",
                }
            });
            //send email
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
        console.log(err,"from get all requests")
        res.status(500).json({ error:err });
    }
}

module.exports = { createRequest, getAllRequests };
