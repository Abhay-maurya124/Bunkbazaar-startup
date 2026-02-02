import "dotenv/config";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

const verifymail = async (token, email, username) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_URI,
      pass: process.env.MAIL_PASS,
    },
  });

  const templatePath = path.join(process.cwd(), "verifymail", "template.hbs");
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(source);

  const verificationUrl = `http://localhost:3000/api/v3/verify/${token}`;

  const htmlToSend = template({
    username: username,
    verificationUrl: verificationUrl,
  });

  const mailOptions = {
    from: process.env.MAIL_URI,
    to: email,
    subject: "BunkBazaar Email Verification",
    html: htmlToSend,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Mail Error:", err.message);
      return;
    }
    console.log("Verification email sent to:", email);
  });
};

export default verifymail;