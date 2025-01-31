import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import apiRouter from "./routes";
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);


export default app; 
 