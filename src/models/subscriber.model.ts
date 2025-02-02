import mongoose, { Document, Schema } from "mongoose";

export interface ISubscriber extends Document {
	email: string;
	verified: boolean;
}

const SubscriberSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	verified: { type: Boolean, default: false },
});

export default mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
