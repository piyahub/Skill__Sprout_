// new

const nodemailer = require('nodemailer');
require("dotenv").config(); // make sure this is there at the top

console.log("Loaded email:", process.env.EMAIL_USER);


const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SkillSprout" <${process.env.EMAIL_USER}>`, // Add app name to sender
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    // console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    return false;
  }
};

module.exports = sendEmail;