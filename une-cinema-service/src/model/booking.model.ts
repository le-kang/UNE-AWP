import mongoose, { Document } from "mongoose"
import { SessionDocument } from './session.model';
import { UserDocument } from './user.model'; 

export interface BookingDocument extends Document {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
  seats: [number]
}

const bookingSchema = new mongoose.Schema({
  rows: Number,
  seats: Number,
  aisles: [Number]
})

export default mongoose.model<BookingDocument>("Booking", bookingSchema)