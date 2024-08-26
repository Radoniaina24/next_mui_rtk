import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
} as SMTPTransport.Options);

type MailOptionDto = {
  from: string;
  to: string;
  subject: string;
  text: string;
};
export async function SendEmail(dto: MailOptionDto) {
  const { from, to, subject, text } = dto;
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: text, // html body
    });
    console.log("Email sent:", info.response);
  } catch (err) {
    console.log(err);
  }
}
