import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true},
  password: { type: String, require: true},
  // The timestamps option tells Mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
},{ timestamps: true })

export default mongoose.model<UserDocument>('User', userSchema)
