import mongoose, { DocumentDefinition } from 'mongoose'
import UserModel, { UserDocument } from '../model/user.model'

export async function getUserByUsername(username: string) {
  return UserModel.findOne({ username }).lean()
}

export async function getUserById(id: string) {
  return UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).lean()
}

export async function createUser(user: DocumentDefinition<UserDocument>) {
  return UserModel.create(user)
}
