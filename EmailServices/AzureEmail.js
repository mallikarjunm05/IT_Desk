const { EmailClient } = require("@azure/communication-email");
var connectionstring = '<endpoint=https://academycommunicationservice.communication.azure.com/;accesskey=l0U4Y55CbJwk9dmjl3gCXzJP1JL101ok5mbpSHE5GdWk03EMUAu8ObGQBElnp8g9B/q3KvrRwnghcgmfwGV2uw==>';
var sender = '<DoNotReply@22bbbda0-b834-4959-b9bc-7b7d88aaad76.azurecomm.net>';
async function sendEmail(){
    
    return sender;
    // const client = new EmailClient(connectionstring);
    // const message = {
    //     senderAddress: sender,
    //     content: {
    //       subject: "This is the subject",
    //       plainText: "This is the body",
    //     },
    //     recipients: {
    //       to: [
    //         {
    //           address: "thummana.pavani@jktech.com",
    //           displayName: "Pavani",
    //         },
    //       ],
    //     },
    //   };
    //   const poller = await client.beginSend(message);
    //   const response = await poller.pollUntilDone();
    //   console.log(response);
}

module.exports= { sendEmail }