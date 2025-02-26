import express from "express";
import {
	createPDF,
	getAllPDFs,
	getPDFById,
	updatePDF,
	deletePDF,
} from "../controllers/pdf.controller";
import protect from "../middleware/tempAuth";

const router = express.Router();

router.get("/", getAllPDFs);
router.get("/:id", getPDFById);
router.post("/", protect, createPDF);
router.put("/:id", protect, updatePDF);
router.delete("/:id", protect, deletePDF);

export default router;
