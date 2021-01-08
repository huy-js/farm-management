const nodeMailer = require("nodemailer");
require("dotenv").config();

let adminEmail = process.env.ACCESS_EMAIL;
let adminPassword = process.env.ACCESS_PASSWORD;
let mailHost = process.env.ACCESS_HOST_NAME;
let mailPort = process.env.ACCESS_POST;

let sendMail = (to, linkVerify) => {
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
    subject: "Xác minh tài khoản thành công",
    html: `<h2>Đăng ký thành công, nhấn vào link bên dưới để kích hoạt tài khoản của bạn</h2>
        <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
        `,
  };
  return transporter.sendMail(options);
};
module.exports = sendMail;
