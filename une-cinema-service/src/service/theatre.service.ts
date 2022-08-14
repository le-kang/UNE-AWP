import TheatreModel from '../model/theatre.model';

export async function getTheatreById(id: string) {
  return await TheatreModel.findById(id).lean();
}