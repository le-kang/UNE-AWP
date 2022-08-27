import mongoose, { Document } from "mongoose"
import { SessionDocument } from './session.model';
import { UserDocument } from './user.model'; 

export interface BookingDocument extends Document {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
  seats: [number]
}

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  seats: [Number]
})

export default mongoose.model<BookingDocument>("Booking", bookingSchema)