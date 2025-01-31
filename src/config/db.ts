import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		console.log("connect to mongo db atlas");
	} catch (error) {
		console.log(error);
	}
}
