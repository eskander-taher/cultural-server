import { Request, Response, NextFunction } from "express";
import Visitor from "../models/visitor.model";

const VISIT_WINDOW_MINUTES = 10; // Time window in minutes
const visitWindowMillis = VISIT_WINDOW_MINUTES * 60 * 1000;

// Middleware to log visitors
export const logVisitor = async (req: Request, res: Response, next: NextFunction) => {
	const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
	const userAgent = req.headers["user-agent"];

	if (typeof ipAddress === "string" && typeof userAgent === "string") {
		try {
			let visitor = await Visitor.findOne({ ipAddress });

			if (visitor) {
				const timeSinceLastVisit = new Date().getTime() - visitor.lastVisit.getTime();

				if (timeSinceLastVisit > visitWindowMillis) {
					// Update the last visit time and increment the visit count
					visitor.lastVisit = new Date();
					visitor.visitCount += 1;
					await visitor.save();
				}
			} else {
				// Create a new visitor entry
				const newVisitor = new Visitor({ ipAddress, userAgent });
				await newVisitor.save();
			}
		} catch (err) {
			console.error("Error logging visitor:", err);
		}
	}

	next();
};
