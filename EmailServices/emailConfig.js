const nodemailer = require("nodemailer");
const fs = require('fs');

let transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // hostname  "smtp.office365.com"  "smtp-mail.outlook.com"
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP

    auth: {
        user: 'thummana.pavani@jktech.com',
        pass: 'pavani@1998'
    }
});


exports.sendemail=async (data,emailid)=> {

    try {

        var templatedata = fs.readFileSync(__dirname + '\\' + 'template.json');
        var template = JSON.parse(templatedata);
        var body;
        var formattedbody;
        let mailOptions ;

        for (let key in template) {
            if (key == data.reqstatus) {
                body = template[key].html;
                const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())

                if (key == "manager rejected" || "CAB manager rejected") {
                    formattedbody = format(body, data.empdetail.empname, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus, data.rejreason);

                    mailOptions = {
                        from: "Pavani  <thummana.pavani@jktech.com>",
                        to: "thummana.pavani@jktech.com" || emailid,
                        subject: `[CR-${data.requestid}] - Ticket Received `,
                        html: formattedbody,
                    }
                }
                else{
                    formattedbody = format(body,  data.empdetail.mgrname, data.requestid, data.type, data.priority, data.location, data.approveremail, data.reqstatus);
                    mailOptions = {
                        from: "Pavani  <thummana.pavani@jktech.com>",
                        to: "thummana.pavani@jktech.com" || emailid,
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
            } else {
                console.log("Email sent successfully!");
            }
        })



    }
    catch (err) {
        console.log(err);
    }

}
