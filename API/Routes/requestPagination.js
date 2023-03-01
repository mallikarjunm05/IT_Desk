var express = require("express");
var router = express.Router();

const DB = require('../../DataBase/db');


router.get('/requests/:page',async (req,res) => {
    const page = parseInt(req.params.page);
    const dbConnection = await DB.ConnectToDb();
    let query = `select * from  requestdetails left join requeststatus on requestdetails.requestid = requeststatus.requestid  `;
    const result = await DB.ExecuteQuery(dbConnection,query);
    var resultsPerPage = req.body.recordsperpage || 5;
    const numOfResults = result.length;
    var TotalPage = Math.round(numOfResults / resultsPerPage);
    const startingLimit = (page - 1) * resultsPerPage;
    const query2 = `select * from  requestdetails left join requeststatus on requestdetails.requestid = requeststatus.requestid  limit ${startingLimit},${resultsPerPage};`;
    var finalresult = await DB.ExecuteQuery(dbConnection,query2);
    await dbConnection.release();
    res.status(200).json({
        Status: {
            StatusCode: 200,
            StatusType: "Success",
            StatusMessage: "Records found",
            StatusSeverity: "Information",
          },
        finalresult,
        currentPage: page,
        TotalPage: TotalPage,
        ResultPerPage: resultsPerPage
      });
    });

    
module.exports=router;