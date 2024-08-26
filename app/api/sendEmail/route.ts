import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
// export async function POST(request: NextRequest, response: NextResponse) {
//   try {
//     const { name, email, phone, message } = await request.json();
//     const transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // Use `true` for port 465, `false` for all other ports
//       auth: {
//         user: "maddison53@ethereal.email",
//         pass: "jn7jnAPss4f63QBp6D",
//       },
//     });
//     const mailOption = {
//       from: "andriambolaradoniainamichael@gmail.com",
//       to: "calebdev777@gmail.com",
//       subject: "lorem",
//       html: `<h3>Hello Augustine</h3>
//       <li>Name: ${name}</li> <li>Email: ${email}</li> <li>Message: ${message}</li>`,
//     };
//     await transporter.sendMail(mailOption);
//     return response.json(
//       { message: "Email Sent successFully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return response.json({ message: "Failed to send Email" }, { status: 500 });
//   }
// }
export async function GET() {
  return NextResponse.json({ message: "Hello Word" });
}
