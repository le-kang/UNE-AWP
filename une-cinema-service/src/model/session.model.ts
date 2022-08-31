import mongoose, { Document } from "mongoose"
import { MovieDocument } from "./movie.model";
import { TheatreDocument } from "./theatre.model";

export interface SessionDocument extends Document {
  movieId: MovieDocument["_id"];
  theatreId: TheatreDocument["_id"];
  time: string;
}

const sessionSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
  time: String
})

export default mongoose.model<SessionDocument>("Session", sessionSchema)
