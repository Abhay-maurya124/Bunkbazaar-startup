import nodemailer from "nodemailer";
import "dotenv/config";
export const Otpmail = ({ email, OTP }) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_URI,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_URI,
    to: email,
    subject: "Your OTP for forget password",
    html: `your OTP is ${OTP}`,
  };
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Mail Error:", err.message);
      return;
    }
    console.log(`OTP sent to ${email} sent to:`);
  });
};
