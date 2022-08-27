import mongoose, { Document } from "mongoose"

export interface TheatreDocument extends Document {
  rows: number;
  seats: number;
  aisles: [number];
}

const theatreSchema = new mongoose.Schema({
  rows: Number,
  seats: Number,
  aisles: [Number]
})

export default mongoose.model<TheatreDocument>("Theatre", theatreSchema)