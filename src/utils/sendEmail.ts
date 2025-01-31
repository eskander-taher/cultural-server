import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export default async function sendEmail(email: string, title: string, htmlContent: string) {
	const message = {
		from: process.env.EMAIL_ADDRESS,
		to: email,
		subject: title,
		html: htmlContent,
	};
	await transporter.sendMail(message);
}
