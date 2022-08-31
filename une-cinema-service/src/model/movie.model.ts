import mongoose, { Document } from "mongoose"

export interface MovieDocument extends Document {
    title: string;
    description:string,
    duration: number,
    directors: [string],
    stars: [string],
    poster: string
}

const movieSchema = new mongoose.Schema({
    title: String,
    description:String,
    duration: Number,
    directors: [String],
    stars: [String],
    poster: String
})

export default mongoose.model<MovieDocument>("Movie", movieSchema)
