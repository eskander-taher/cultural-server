import { Request, Response } from "express";
import News from "../models/news.model"; // Adjust the path as necessary

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
			res.status(404).send();
			return;
		}
		res.status(200).send(news);
	} catch (error) {
		res.status(500).send(error);
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