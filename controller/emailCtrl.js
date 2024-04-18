const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "houssinoss010203@gmail.com",
      pass: "plye ndsk ealx deir",
    },
  });
  const mailOptions = {
    from: "Hey from <test@gmail.com>",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});
module.exports = { sendEmail };
