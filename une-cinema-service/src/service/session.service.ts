import SessionModel from '../model/session.model'

export async function getAllSessions() {
  return await SessionModel.find().lean()
}

export async function getSessionsByMovieId(movieId: string) {
  return await SessionModel.find({ movieId }).lean()
}

export async function getSessionById(id: string) {
  return await SessionModel.findById(id).lean()
}
