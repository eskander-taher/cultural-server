import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
	id?: string;
	title: string;
	titleEnglish?: string;
	titleRussian?: string;
	description: string;
	descriptionEnglish?: string;
	descriptionRussian?: string;
	thumbnail?: string;
	images?: string[];
	isImportant?: boolean;
	category?: string;
	date: Date;
}

const NewsSchema: Schema = new Schema({
	title: { type: String, required: true },
	titleEnglish: { type: String },
	titleRussian: { type: String },
	description: { type: String, required: true },
	descriptionEnglish: { type: String },
	descriptionRussian: { type: String },
	thumbnail: { type: String },
	images: { type: [String] },
	isImportant: { type: Boolean, default: false },
	category: { type: String, default: "NEWS" },
	date: { type: Date, default: Date.now },
});

export default mongoose.model<INews>("News", NewsSchema);

