import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { connectDB } from "./config/db";
import apiRouter from "./routes";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
}).array("images", 12); // Allow up to 12 images

// Check file type
const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Images only!"));
	}
};

// Upload route
app.post("/api/upload", (req, res) => {
	upload(req, res, (err) => {
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
});

export default app;
