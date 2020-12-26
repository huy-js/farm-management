const nodeMailer = require("nodemailer");
require("dotenv").config();
//const pathSaveFile = "C:UsersAdminDesktop\farm-managementserversrcpublic";
let adminEmail = process.env.ACCESS_EMAIL;
let adminPassword = process.env.ACCESS_PASSWORD;
let mailHost = process.env.ACCESS_HOST_NAME;
let mailPort = process.env.ACCESS_POST;

// let fs = require("fs");
// const fse = require("fs-extra");
let sendMailQR = async (to, buf) => {
  console.log(buf);
  let transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });
  let options = {
    from: adminEmail,
    to: to,
    subject: "Đây là số QR bạn yêu cầu",
    attachments: [
      {
        /* the uniqueness of my question begins from here */
        // file being sent is Excel file as '.xlsx' indicates
        filename: new Date().getTime() + ".xlsx",
        // content/data being sent an array of objects
        content: Buffer.from(buf, "utf-8"),
      },
    ],
  };
  console.log("send");
  return transporter.sendMail(options);
};

module.exports = sendMailQR;
