import { Request, Response } from "express";
import Subscriber, { ISubscriber } from "../models/subscriber.model";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";
import ejs from "ejs";
import path from "path";

// Function to generate JWT token
const generateToken = (email: string): string => {
	return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

// Function to render the email template
const renderEmailTemplate = async (token: string, baseUrl: string): Promise<string> => {
	const templatePath = path.join(__dirname, "../../views/verificationEmail.ejs");
	return ejs.renderFile(templatePath, { token, baseUrl });
};

// Function to render the confirmation email template
const renderConfirmationEmailTemplate = async (): Promise<string> => {
	const templatePath = path.join(__dirname, "../../views/confirmationEmail.ejs");
	return ejs.renderFile(templatePath, {});
};

// Controller to create a new subscriber and send verification email
export const createSubscriber = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		// Check if the subscriber already exists
		const existingSubscriber = await Subscriber.findOne({ email });
		if (existingSubscriber) {
			res.status(400).json({ message: "Subscriber already exists" });
			return;
		}

		// Create a new subscriber
		const newSubscriber: ISubscriber = new Subscriber({ email, verified: false });
		await newSubscriber.save();

		// Generate JWT token
		const token = generateToken(email);

		// Determine the base URL based on the environment
		const baseUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : `http://localhost:5000`;

		// Render the email template
		if (process.env.PRODUCTION_URL) {
		}
		const htmlContent = await renderEmailTemplate(token, baseUrl!);

		// Send verification email
		await sendEmail(email, "Verify Your Email", htmlContent);

		res.status(201).json({ message: "Subscriber created. Verification email sent." });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
};

// Controller to verify email
export const verifyEmail = async (req: Request, res: Response) => {
	try {
		const { token } = req.query;

		if (!token) {
			res.status(400).send("Token is missing");
			return;
		}

		// Verify the JWT token
		const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);

		if (typeof decoded === "string") {
			res.status(400).send("Invalid token");
			return;
		}

		const { email } = decoded;

		// Find the subscriber and update the verified status
		const subscriber = await Subscriber.findOneAndUpdate({ email }, { verified: true }, { new: true });

		if (!subscriber) {
			res.status(404).send("Subscriber not found");
			return;
		}

		// Render the confirmation email template
		const confirmationHtmlContent = await renderConfirmationEmailTemplate();

		// Send the confirmation HTML as the response
		res.status(200).send(confirmationHtmlContent);
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
};
