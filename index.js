const express= require('express');
const app=express();
const router= express.Router();
const bodyparser=require('body-parser')
var logger = require('morgan');
const cors= require('cors')
// const EmployeeManager = require('./API/Routes/EmployeeManager');
// const ReqManager = require('./API/Routes/RequestManager');
const ListDataMasterManager = require('./API/Routes/ListDataMasterManager');
const ListDataDetailManager = require('./API/Routes/ListDataDetailManager');

app.use(bodyparser.urlencoded({
extended:true,
}))
app.use(bodyparser.json())
app.use(express.json())
app.use(cors('*'))
app.use(logger('dev'));
app.disable('etag');

// app.use('/EmpManager',EmployeeManager);
// app.use('/ReqManager',ReqManager);
app.use('/ListDataMaster',ListDataMasterManager);
app.use('/ListDataDetail',ListDataDetailManager);

app.listen(3000
    ,()=>{
    console.log("listening on 3000")
})

module.exports=router;