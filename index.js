const express= require('express');
const https = require('https');
const app=express();
const router= express.Router();
const bodyparser=require('body-parser')
var logger = require('morgan');
const cors= require('cors')
const passport = require("passport");
const fs =require('fs');
const path=require('path');
const { bearerStrategy , isAuthenticated } = require('./authorize')

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
app.use(cors('*'))

app.use(logger('dev'));
app.disable('etag');

app.use(passport.initialize());
passport.use(bearerStrategy);
// app.use(isAuthenticated);
const clientconnection = (req,res,next)=>{
  const client = {
   host : req.hostname || req.host || req.headers['host'],
   url : req.url,
   referer : req.headers['referer'] || req.originalUrl
  }
  console.log(client)
  next()
}
app.use(clientconnection)
app.use('/ListDataMaster',ListDataMasterManager);
app.use('/ListDataDetail',ListDataDetailManager);
app.use('/EmpManager',EmployeeManager);
app.use('/LocationManager',LocationManager);
app.use('/RequestManager',RequestManager);
app.use('/RequestStatusManager',RequestStatusManager);
app.use('/RequestPaginationManager',ResultPerPageManager);

const options ={
  key:fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
  cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
}
const sslserver =https.createServer(options,app);
sslserver.disableKeepAlive = true;
sslserver.keepAliveTimeout =120000;

sslserver.listen(3000
    ,()=>{
    console.log("listening on 3000")
})

sslserver.keepAliveTimeout = 30000;
app.listen(3000,'localhost', ()=>{
  console.log("app listening on prt 3000!");
})
// var http = require('http'); 

// http.createServer(app).listen(3000);

module.exports = router;