const nodemailer = require("nodemailer");
const sendMail = ({ from, text }) => {
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
    from: from,
    to: "houssinmhamdi123@gmail.com",
    sender: "houssinmhamdi123@gmail.com",
    subject: "Sending Email using Node.js",
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
