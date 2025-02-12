import { Request, Response } from "express";
import News from "../models/news.model"; // Adjust the path as necessary
import fs from "fs";
import path from "path";

// Create a new news item
export const createNews = async (req: Request, res: Response) => {
	try {
		const news = new News(req.body);
		await news.save();
		res.status(201).send(news);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Get all news items
export const getAllNews = async (req: Request, res: Response) => {
	try {
		const news = await News.find();
		res.status(200).send(news);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get a single news item by ID
export const getNewsById = async (req: Request, res: Response) => {
	try {
		const news = await News.findById(req.params.id);
		if (!news) {
			res.status(404).send();
			return;
		}
		res.status(200).send(news);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Update a news item by ID
export const updateNews = async (req: Request, res: Response) => {
	try {
		const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!news) {
			res.status(404).send();
			return;
		}
		res.status(200).send(news);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Delete a news item by ID
export const deleteNews = async (req: Request, res: Response) => {
	try {
		const news = await News.findByIdAndDelete(req.params.id);
		if (!news) {
			res.status(404).send({ error: "News item not found" });
			return;
		}

		// Define the upload directory
		const uploadDir = path.join(__dirname, "..", "..", "uploads"); // Adjust the path according to your project structure

		// Delete the thumbnail if it exists
		if (news.thumbnail) {
			const thumbnailPath = path.join(uploadDir, news.thumbnail);
			fs.unlink(thumbnailPath, (err) => {
				if (err) {
					console.error(`Error deleting thumbnail: ${err.message}`);
				}
			});
		}

		// Delete additional images if they exist
		if (news.images && news.images.length > 0) {
			news.images.forEach((image) => {
				const imagePath = path.join(uploadDir, image);
				fs.unlink(imagePath, (err) => {
					if (err) {
						console.error(`Error deleting image: ${err.message}`);
					}
				});
			});
		}

		res.status(200).send(news);
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

// Get all important news items
export const getImportantNews = async (req: Request, res: Response) => {
	try {
		const importantNews = await News.find({ isImportant: true });
		res.status(200).send(importantNews);
	} catch (error) {
		res.status(500).send(error);
	}
};