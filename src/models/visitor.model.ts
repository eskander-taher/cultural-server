import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Visitor document
interface IVisitor extends Document {
	ipAddress: string;
	userAgent: string;
	lastVisit: Date;
	visitCount: number;
}

// Create the schema for the Visitor model
const visitorSchema: Schema<IVisitor> = new Schema({
	ipAddress: { type: String, required: true },
	userAgent: { type: String, required: true },
	lastVisit: { type: Date, default: Date.now },
	visitCount: { type: Number, default: 1 }, // Add visitCount field
});

// Create the Visitor model
const Visitor = mongoose.model<IVisitor>("Visitor", visitorSchema);

export default Visitor;
