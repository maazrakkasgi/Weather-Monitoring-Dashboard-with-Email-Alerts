//backend/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail", 
  secure:true,
  port:465,// or any other email service
  auth: {
    user: 'amanusmani397@gmail.com', // your email address
    pass: 'cweuzeigwkzlgiaz', // your email password or app-specific password
  },
});

const sendEmailNotification = (recipientEmail, subject, text) => {
  const mailOptions = {
    from: 'amanusmani397@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailNotification };


