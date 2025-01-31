import express from "express";
import { createNews, getAllNews, getNewsById, updateNews, deleteNews, getImportantNews  } from "../controllers/news.controller";
import protect from "../middleware/tempAuth";

const router = express.Router();

router.get("/", getAllNews);
router.get("/important", getImportantNews); // New route for important news
router.get("/:id", getNewsById);
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);


export default router;
