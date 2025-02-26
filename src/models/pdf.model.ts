import mongoose, { Document, Schema } from "mongoose";

export interface IPDF extends Document {
	title: string;
	file: string;
	date?: Date;
	category?: string;
	descrption?: string;
}

const PDFSchema: Schema = new Schema({
	title: { type: String, required: true },
	file: { type: String, required: true },
	date: { type: Date, default: Date.now },
	category: { type: String },
	description: { type: String },
});

export default mongoose.model<IPDF>("PDF", PDFSchema);
