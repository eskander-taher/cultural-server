import { Request, Response } from "express";
import PDF from "../models/pdf.model"; // Adjust the path as necessary
import fs from "fs";
import path from "path";

// Create a new PDF
export const createPDF = async (req: Request, res: Response) => {
	try {
		const pdf = new PDF(req.body);
		await pdf.save();
		res.status(201).send(pdf);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Get all PDFs
export const getAllPDFs = async (req: Request, res: Response) => {
	try {
		const pdfs = await PDF.find().sort({ date: -1 });
		res.status(200).send(pdfs);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get all PDFs
export const getAllMagazines = async (req: Request, res: Response) => {
	try {
		const pdfs = await PDF.find({category: "MAGAZINE"}).sort({ date: -1 });
		res.status(200).send(pdfs);
	} catch (error) {
		res.status(500).send(error);
	}
};
// Get all PDFs
export const getAllAnnounceCul = async (req: Request, res: Response) => {
	try {
		const pdfs = await PDF.find({category: "ANNOUNCE-CUL"}).sort({ date: -1 });
		res.status(200).send(pdfs);
	} catch (error) {
		res.status(500).send(error);
	}
};
// Get all PDFs
export const getAllAnnounceMin = async (req: Request, res: Response) => {
	try {
		const pdfs = await PDF.find({category: "ANNOUNCE-MIN"}).sort({ date: -1 });
		res.status(200).send(pdfs);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get a single PDF by ID
export const getPDFById = async (req: Request, res: Response) => {
	try {
		const pdf = await PDF.findById(req.params.id);
		if (!pdf) {
			res.status(404).send({ error: "PDF not found" });
			return;
		}
		res.status(200).send(pdf);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Update a PDF by ID
export const updatePDF = async (req: Request, res: Response) => {
	try {
		const { title, file, date, category, description } = req.body;

		const pdf = await PDF.findById(req.params.id);
		if (!pdf) {
			res.status(404).send({ error: "PDF not found" });
			return;
		}

		// Update fields if provided
		if (title) {
			pdf.title = title;
		}
		if (file) {
			// Delete the old PDF file
			const oldFilePath = path.join(__dirname, "..", "..", pdf.file);
			fs.unlink(oldFilePath, (err) => {
				if (err) {
					console.error(`Error deleting old PDF file: ${err.message}`);
				}
			});

			pdf.file = file;
		}

		if (date) {
			pdf.date = date;
		}

		if (category) {
			pdf.category = category;
		}

		if (description) {
			pdf.descrption = description;
		}

		await pdf.save();
		res.status(200).send(pdf);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Delete a PDF by ID
export const deletePDF = async (req: Request, res: Response) => {
	try {
		const pdf = await PDF.findByIdAndDelete(req.params.id);
		if (!pdf) {
			res.status(404).send({ error: "PDF not found" });
			return;
		}

		// Delete the associated PDF file
		const filePath = path.join(__dirname, "..", "..", "uploads", pdf.file);
		fs.unlink(filePath, (err) => {
			if (err) {
				console.error(`Error deleting PDF file: ${err.message}`);
			}
		});

		res.status(200).send(pdf);
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
