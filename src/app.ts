import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db";
import apiRouter from "./routes";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use("/api", apiRouter);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Serve static files from the client build directory
const clientPath = path.join(__dirname, "..", "client", "frontend");
app.use(express.static(clientPath));

// Set up EJS as the template engine (if you're still using it)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Catch-all route to serve the client's index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

export default app;