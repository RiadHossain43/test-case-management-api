let nodeMailer = require("nodemailer");

function generateMail(type, payload) {
  switch (type) {
    case "varify-yourself": {
      return {
        subject: "Please verify yourself to start your whisper",
        template: require("./templates/acountVarification")(payload),
      };
    }
    default:
      break;
  }
}

exports.sendMail = (type, receiver, payload) => {
  const trasporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SYSTEM_EMAIL,
      pass: process.env.SYSTEM_EMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.SYSTEM_EMAIL,
    to: receiver,
    subject: generateMail(type, payload).subject,
    html: generateMail(type, payload).template,
    attachments: payload.attachments,
  };
  return new Promise(async (resolve, reject) => {
    try {
      let sentDetails = await trasporter.sendMail(mailOptions);
      resolve({
        message: "Email sent successfully ",
        sentDetails,
      });
    } catch (error) {
      reject({
        message: "Failed to send email ",
        error: error,
      });
    }
  });
};
