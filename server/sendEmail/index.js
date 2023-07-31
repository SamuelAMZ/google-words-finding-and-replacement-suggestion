const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

const sendEmail = async (emailAddress) => {
  pathToAttachment = "./server/createPdf/words.pdf";
  attachment = fs.readFileSync(pathToAttachment).toString("base64");

  const msg = {
    to: emailAddress,
    from: "lfish-cheznous@lfishtogo.com",
    subject: "Report from the words finding & suggestions request",
    text: "Open the PDF file to see the full report.",
    attachments: [
      {
        content: attachment,
        filename: "attachment.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  sgMail.send(msg).catch((err) => {
    console.log(err);
  });
};

module.exports = sendEmail;
