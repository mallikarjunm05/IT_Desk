const nodemailer = require("nodemailer");
const fs = require('fs');
const { EmailClient } = require("@azure/communication-email");
var connectionstring;
var sender;

let transporter;
async function emailOptions(listdtlcode){
    if (listdtlcode == "Google") {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pavanivage@gmail.com',
                pass: 'mjjsrfbednbvkodo',
            },
        });
    }
    else if (listdtlcode == "JKSMTP") {
        transporter = nodemailer.createTransport({
            host: "smtp.office365.com", // hostname  "smtp.office365.com" 
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            auth: {
                // user: 'thummana.pavani@jktech.com',
                // pass: 'pavani@1998'
                user: 'Vishwas.v@jktech.com',
                pass: 'Vishu@123',
            }
        });
    }
    else {
    connectionstring = '<endpoint=https://academycommunicationservice.communication.azure.com/;accesskey=l0U4Y55CbJwk9dmjl3gCXzJP1JL101ok5mbpSHE5GdWk03EMUAu8ObGQBElnp8g9B/q3KvrRwnghcgmfwGV2uw==>';
    sender = '<DoNotReply@22bbbda0-b834-4959-b9bc-7b7d88aaad76.azurecomm.net>';
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
