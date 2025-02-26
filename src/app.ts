import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db";
import apiRouter from "./routes";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "https://admin-ruddy-eight.vercel.app",
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use("/api", apiRouter);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

export default app;
