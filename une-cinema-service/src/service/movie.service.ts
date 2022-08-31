import MovieModel from '../model/movie.model'

export async function getAllMovies() {
  return await MovieModel.find().lean()
}

export async function getMovieById(id: string) {
  return await MovieModel.findById(id).lean()
}
