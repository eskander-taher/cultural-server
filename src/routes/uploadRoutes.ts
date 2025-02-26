import express from "express";
import { uploadImages, uploadPDF } from "../controllers/uploadController";

const router = express.Router();

router.post("/images", uploadImages);
router.post("/pdf", uploadPDF);

export default router;
