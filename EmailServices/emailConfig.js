const nodemailer = require("nodemailer");
const fs = require('fs');

const { getDescByListCode} = require('../Services/ListDataDetailService');
const { getDescByMasterCode} = require('../Services/ListDataMasterServices');
const { EmailClient } = require("@azure/communication-email");
let connectionstring;
let sender;

let transporter ;

exports.sendemail = async (data, emailid) => {

    try {
        
        var templatedata = fs.readFileSync(__dirname + '\\' + 'template.json');
        var template = JSON.parse(templatedata);

        var body;
        var formattedbody;
        let mailOptions;

        let data1 = { listcode :"USEMailService"}
        let mastercode = await getDescByMasterCode(data1);
        console.log(mastercode[0].listdesc,"listdesc");
        let listdtlcode = mastercode[0].listdesc;
        // let listdtlcode = "Google";
       
        let data2 ={ listdtlcode : listdtlcode }
        let result = await getDescByListCode(data2);
       
        let details = result[0].listdtldesc.split(',');
        console.log(typeof(details[0]),"resulted desc user ");
        console.log(typeof(details[1]),details[1],"resulted desc pass");
        if (listdtlcode == "Google") {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: details[0],
                    pass: details[1],
                },
            });
        }
        else if (listdtlcode == "JKSMTP") {
            transporter = nodemailer.createTransport({
                host: "smtp.office365.com", // hostname  "smtp.office365.com" 
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587, // port for secure SMTP
                auth: {
                    user: details[0],
                    pass: details[1]

                }
            });
        }
        else {
        connectionstring = details[0];
        sender = details[1];

        }

        if ( transporter == undefined) {

            console.log("from azure");

            const client = new EmailClient(connectionstring);

            for (let key in template) {
                if (key == data.reqstatus) {
                    body = template[key].html;
                    const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())

                    if (key == "Manager Rejected" ) {
                        formattedbody = format(body, data.empdetail.empname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            to: emailid ,
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else if(key =="CAB Approved"){
                            formattedbody = format(body, data.empdetail.empname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);
    
                            mailOptions = {
                                to: emailid ,
                                subject: `[CR-${data.requestid}] - Ticket Received `,
                                html: formattedbody,
                            }
                    }
                    else if (key == "CAB Rejected" || key == "Manager Approved") {
                        formattedbody = format(body, process.env.CABManager, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            to: process.env.CABMailId ,
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else {
                        formattedbody = format(body, data.empdetail.mgrname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus);
                        mailOptions = {
                            to: emailid,
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }


                    console.log(formattedbody);
                }
            }


            const message = {
                senderAddress: sender,
                content: {
                    subject: mailOptions.subject,
                    html: mailOptions.html
                },
                recipients: {
                    to: [
                        {
                            address:mailOptions.to,
                        },
                    ],
                },
            };
            const poller = await client.beginSend(message);
            const response = await poller.pollUntilDone();
            console.log(response,"email sent using azure");            
    
        }
        else {

            for (let key in template) {

                if (key == data.reqstatus) {

                    body = template[key].html;
                    const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())

                    if (key == "Manager Rejected" || key =="CAB Approved") {
                        formattedbody = format(body, data.empdetail.empname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            to: emailid || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else if (key == "CAB Rejected" || key == "Manager Approved") {
                        formattedbody = format(body,process.env.CABManager, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            to: process.env.CABMailId || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else {
                        console.log("google to new request ")
                        formattedbody = format(body, data.empdetail.mgrname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus);
                        mailOptions = {
                            to: emailid || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }


                    console.log(formattedbody);
                }
            }



            transporter.sendMail(mailOptions, function (err, success) {
                if (err) {
                    console.log(err);
                    process.send("email not sent");
                } else {
                    console.log("Email sent successfully!");
                    process.send("email sent");
                }
            })

        }

    }
    catch (err) {
        console.log(err);
    }

}
