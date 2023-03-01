const { fileNanme, logger } = require('../../log4');
const RequestStatusServices = require('../../Services/RequestStatusService');

var fname;

fileNanme(__filename).then((data) => {
    fname = data;
});



const getAllRequestStatus = async (req, res) => {
    try {
        logger.info(`file: ${fname} getAllRequestStatus is called`);
        const result = await RequestStatusServices.getAllRequests();
        logger.info(`file: ${fname} , statuscode : 200`)
        res.status(200).json({
            Status: {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "Records found Succesfully!!",
                StatusSeverity: "Information",
            },
            result: result
        });

    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from getallrequeststatus");
        res.status(500).json({ error: err });
    }
}

const editrequestStatus = async (req, res) => {
    try {
        logger.info(`file: ${fname} editrequestStatus  is called`);
        const result = await RequestStatusServices.editrequestStatus(req.body);
        logger.info(`file: ${fname} , statuscode : 200`)
        res.status(200).json({
            Status: {
                StatusCode: 200,
                StatusType: "Success",
                StatusMessage: "Record Updated Succesfully!!",
                StatusSeverity: "Information",
            },
            result: result
        });

    }
    catch (err) {
        logger.fatal(`file: ${fname},error: ${err}`);
        console.log(err, "from editrequestStatus ");
        res.status(500).json({ error: err });
    }
}


module.exports = { getAllRequestStatus, editrequestStatus };
