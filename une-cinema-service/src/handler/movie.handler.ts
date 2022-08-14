import express, { Request, Response } from "express";

import validateSchema from '../middleware/validateSchema';

import { getMovieByIdSchema } from '../schema/movie.schema';

import { getAllMovies, getMovieById } from '../service/movie.service'

const movieHandler = express.Router();

// Get ALL movies
movieHandler.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllMovies();
    return res.status(200).send(result.map(m => ({
      _id: m.id,
      title: m.title,
      poster: m.poster
    })));
  } catch (err) {
    return res.status(500).send(err);
  }
})

movieHandler.get("/:movieId", validateSchema(getMovieByIdSchema), async (req: Request, res: Response) => {
  const result = await getMovieById(req.params.movieId);
  if(result) {
    return res.status(200).json(result);
  }
  res.sendStatus(404);
})

// // Get sessions for a movie
// movieHandler.get("/:movieId/session", (req: Request, res: Response) => {
//   res.status(200).json([  
//     {
//       "_id": 1,
//       "movieId": 1,
//       "theatreId": 1,
//       "time": "7:15 PM"
//     },
//   ])
// })

export default movieHandler;