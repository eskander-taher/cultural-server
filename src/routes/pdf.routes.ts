import express from "express";
import {
	createPDF,
	getAllPDFs,
	getPDFById,
	updatePDF,
	deletePDF,
	getAllMagazines,
	getAllAnnounceCul,
	getAllAnnounceMin,
} from "../controllers/pdf.controller";
import protect from "../middleware/tempAuth";

const router = express.Router();

router.get("/", getAllPDFs);
router.get("/magazines", getAllMagazines);
router.get("/announce-culs", getAllAnnounceCul);
router.get("/announce-min", getAllAnnounceMin);
router.get("/:id", getPDFById);
router.post("/", protect, createPDF);
router.put("/:id", protect, updatePDF);
router.delete("/:id", protect, deletePDF);

export default router;
