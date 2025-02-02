import express from "express";
import { createSubscriber, verifyEmail } from "../controllers/subscriberController";

const router = express.Router();

// Route to create a new subscriber
router.post("/", createSubscriber);
router.get("/verify", verifyEmail);

export default router;
