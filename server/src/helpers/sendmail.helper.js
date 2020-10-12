const nodeMailer = require("nodemailer")
require("dotenv").config();

let adminEmail = process.env.ACCESS_EMAIL;
let adminPassword = process.env.ACCESS_PASSWORD;
let mailHost = process.env.ACCESS_HOST_NAME;
let mailPort = process.env.ACCESS_POST;

let sendMail =(to,password)=>{
    let transporter = nodeMailer.createTransport({
        host:mailHost,
        port:mailPort,
        secure:false,
        auth:{
            user:adminEmail,
            pass:adminPassword
        }
    });
    let options ={
        from: adminEmail,
        to:to,
        subject:"Xác minh tài khoản thành công, nhận password",
        html:`<h2>Bạn đã đăng ký mua QR</h2>
        <h3>Đây là password của bạn: ${password}</h3>
        <div>thông tin đăng nhập là địa chỉ mail đăng ký và password này</div>
        `
    };
    return transporter.sendMail(options);
}
module.exports = sendMail;