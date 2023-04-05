var express = require("express");
var router = express.Router();
const { addEmployee,getEmployees ,getEmployeeById,deleteEmployeeById,EditEmployeedetails,empFilter,
    getEmployeeIdByDevice,getEmployeeNameById,getEmployeeNameByLevel} = require('../Controllers/EmployeeController');

router.get('/',getEmployees);

router.post('/add',addEmployee);

router.post('/getemployeebyId',getEmployeeById);

router.post('/deleteemployeebyId',deleteEmployeeById);

router.post('/updateemp',EditEmployeedetails);

router.post('/empfilter',empFilter);

router.post('/getidbydevice',getEmployeeIdByDevice);

router.post('/getnamebyid',getEmployeeNameById);

router.post('/getnamebylevel',getEmployeeNameByLevel);

module.exports=router;