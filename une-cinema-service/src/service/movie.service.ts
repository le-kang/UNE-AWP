import MovieModel from '../model/movie.model';

export async function getAllMovies() {
  return await MovieModel.find();
}

export async function getMovieById(id: string) {
  return await MovieModel.findById(id);
}