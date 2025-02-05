import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface TransporterConfig {
    host: string;
    port: number;
    secure: boolean;
}

function createTransporter(email: string): nodemailer.Transporter {
    const domain = email.split('@')[1];
    let config: TransporterConfig;

    switch (domain) {
        case 'gmail.com':
            config = {
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
            };
            break;
        case 'yahoo.com':
            config = {
                host: "smtp.mail.yahoo.com",
                port: 465,
                secure: true,
            };
            break;
        case 'hotmail.com':
        case 'outlook.com':
            config = {
                host: "smtp.office365.com",
                port: 587,
                secure: false,
            };
            break;
        default:
            throw new Error("Unsupported email domain");
    }

    return nodemailer.createTransport({
        ...config,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
}

export default async function sendEmail(email: string, title: string, htmlContent: string): Promise<void> {
    const transporter = createTransporter(email);
    const message = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: title,
        html: htmlContent,
    };
    await transporter.sendMail(message);
}
