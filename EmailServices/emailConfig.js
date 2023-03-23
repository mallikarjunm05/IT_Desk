const nodemailer = require("nodemailer");
const fs = require('fs');
const { EmailClient } = require("@azure/communication-email");
const { getDescByListCode} = require('../Services/ListDataDetailService');
const { getDescByMasterCode} = require('../Services/ListDataMasterServices');

let connectionstring;
let sender;

let transporter;


async function emailOptions(listdtlcode){

    let data ={ listdtlcode : listdtlcode }
    let result = await getDescByListCode(data);
   
    let details = result[0].listdtldesc.split(',');
    console.log(details[0],"resulted desc ");
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
                // user: 'Vishwas.v@jktech.com',
                // pass: 'Vishu@123',
            }
        });
    }
    else {
    connectionstring = details[0];
    sender = details[1];
        // sender = azureEmail.sendEmail();
    }
}

exports.sendemail = async (data, emailid,listdtlcode) => {

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

        emailOptions(listdtlcode);
        console.log(listdtlcode, "listdtalcode");

        if (transporter != undefined) {

            for (let key in template) {
                if (key == data.reqstatus) {
                    body = template[key].html;
                    const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())

                    if (key == "Manager Rejected" || key =="CAB Approved") {
                        formattedbody = format(body, data.empdetail.empname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            from: "Pavani  <thummana.pavani@jktech.com>",
                            to: emailid || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else if (key == "CAB Rejected" || key == "Manager Approved") {
                        formattedbody = format(body,process.env.CABManager, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            from: "Pavani  <thummana.pavani@jktech.com>",
                            to: process.env.CABMailId || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else {
                        formattedbody = format(body, data.empdetail.mgrname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus);
                        mailOptions = {
                            from: "Pavani  <thummana.pavani@jktech.com>",
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
        else {

            const client = new EmailClient(connectionstring);

            for (let key in template) {
                if (key == data.reqstatus) {
                    body = template[key].html;
                    const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())

                    if (key == "Manager Rejected" || key =="CAB Approved") {
                        formattedbody = format(body, data.empdetail.empname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            // from: "Pavani  <thummana.pavani@jktech.com>",
                            to: emailid || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else if (key == "CAB Rejected" || key == "Manager Approved") {
                        formattedbody = format(body, process.env.CABManager, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                        mailOptions = {
                            // from: "Pavani  <thummana.pavani@jktech.com>",
                            to: process.env.CABMailId || "thummana.pavani@jktech.com",
                            subject: `[CR-${data.requestid}] - Ticket Received `,
                            html: formattedbody,
                        }
                    }
                    else {
                        formattedbody = format(body, data.empdetail.mgrname, data.requestid, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus);
                        mailOptions = {
                            // from: "Pavani  <thummana.pavani@jktech.com>",
                            to: emailid || "thummana.pavani@jktech.com",
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

    }
    catch (err) {
        console.log(err);
    }

}
