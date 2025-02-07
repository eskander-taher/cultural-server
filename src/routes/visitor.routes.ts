import express from "express";
import { getVisitCounts } from "../controllers/visitor.controller";
import { logVisitor } from "../middleware/logVisitor";

const router = express.Router();

router.get("/log", logVisitor, (req, res) => {
	res.status(200).json({ message: "Visit logged" });
});

router.get("/visit-counts", getVisitCounts);

export default router;
