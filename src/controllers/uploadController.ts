import { Request, Response } from "express";
import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// Initialize upload variable
const upload = multer({
	storage: storage,
	limits: { fileSize: 10_000_000 }, // Limit file size to 10MB
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

// Check file type
const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	const filetypes = /jpeg|jpg|png|gif|pdf/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Images and PDFs only!"));
	}
};

// Upload images controller
export const uploadImages = (req: Request, res: Response) => {
	upload.array("images", 12)(req, res, (err) => {
		if (err) {
			res.status(400).json({ message: err.message });
		} else {
			if (req.files) {
				res.status(200).json({
					message: "Files uploaded successfully",
					files: req.files,
				});
			} else {
				res.status(400).json({ message: "No files uploaded" });
			}
		}
	});
};

// Upload PDF controller
export const uploadPDF = (req: Request, res: Response) => {
	upload.single("pdf")(req, res, (err) => {
		if (err) {
			res.status(400).json({ message: err.message });
		} else {
			if (req.file) {
				res.status(200).json({
					message: "PDF uploaded successfully",
					file: req.file,
				});
			} else {
				res.status(400).json({ message: "No PDF uploaded" });
			}
		}
	});
};
