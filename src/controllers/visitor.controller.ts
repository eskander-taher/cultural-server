import { Request, Response } from "express";
import Visitor from "../models/visitor.model";

// Helper function to get the start and end dates for a given time frame
const getDateRange = (timeFrame: string): { start: Date; end: Date } => {
	const now = new Date();
	switch (timeFrame) {
		case "day":
			return {
				start: new Date(now.setHours(0, 0, 0, 0)),
				end: new Date(now.setHours(23, 59, 59, 999)),
			};
		case "month":
			return {
				start: new Date(now.setDate(1)),
				end: new Date(),
			};
		case "year":
			return {
				start: new Date(now.setMonth(0, 1)),
				end: new Date(),
			};
		default:
			throw new Error("Invalid time frame");
	}
};

// Controller to get visit counts for different time frames
export const getVisitCounts = async (req: Request, res: Response): Promise<void> => {
	try {
		const timeFrames = ["day", "month", "year", "total"];
		const visitCounts: { [key: string]: number } = {};

		for (const timeFrame of timeFrames) {
			const pipeline: any[] = [];
			if (timeFrame !== "total") {
				const dateRange = getDateRange(timeFrame);
				pipeline.push({
					$match: {
						lastVisit: {
							$gte: dateRange.start,
							$lte: dateRange.end,
						},
					},
				});
			}

			pipeline.push({
				$group: {
					_id: null,
					totalVisits: { $sum: "$visitCount" },
				},
			});

			const visits = await Visitor.aggregate(pipeline);
			visitCounts[timeFrame] = visits.length > 0 ? visits[0].totalVisits : 0;
		}

		res.json(visitCounts);
	} catch (err) {
		console.error("Error getting visit counts:", err);
		res.status(500).json({ error: "Error getting visit counts" });
	}
};
