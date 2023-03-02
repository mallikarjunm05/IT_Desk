const express= require('express');
const app=express();
const router= express.Router();
const bodyparser=require('body-parser')
var logger = require('morgan');
const cors= require('cors')

const ListDataMasterManager = require('./API/Routes/ListDataMasterManager');
const ListDataDetailManager = require('./API/Routes/ListDataDetailManager');
const EmployeeManager = require('./API/Routes/EmployeeManager');
const LocationManager = require('./API/Routes/LocationManager');
const RequestManager = require('./API/Routes/RequestManager');
const RequestStatusManager = require('./API/Routes/RequestStatusManager');
const ResultPerPageManager = require('./API/Routes/requestPagination');


app.use(cors(
    origin="*"
  ))
app.use(bodyparser.urlencoded({
extended:true,
}))
app.use(bodyparser.json())
app.use(express.json())
// app.use(cors('*'))

app.use(logger('dev'));
app.disable('etag');


app.use('/ListDataMaster',ListDataMasterManager);
app.use('/ListDataDetail',ListDataDetailManager);
app.use('/EmpManager',EmployeeManager);
app.use('/LocationManager',LocationManager);
app.use('/RequestManager',RequestManager);
app.use('/RequestStatusManager',RequestStatusManager);
app.use('/RequestPaginationManager',ResultPerPageManager);
app.listen(3000
    ,()=>{
    console.log("listening on 3000")
})

module.exports=router;