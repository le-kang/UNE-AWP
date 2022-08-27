import express, { Request, Response } from "express";

import { getSessionByIdSchema } from '../schema/session.schema';
import validateSchema from '../middleware/validateSchema';
import { getSessionById } from "../service/session.service";
import { getMovieById } from "../service/movie.service";
import { getTheatreById } from "../service/theatre.service";
import { getBookingsBySessionId, getBookingsByFilter } from "../service/booking.service";
import { deserializeUser } from "../middleware/deserializeUser";

const sessionHandler = express.Router();

sessionHandler.use(deserializeUser);

// Get session details, expecting movie, session, theatre, booked seats and occupied seats
sessionHandler.get("/:id", validateSchema(getSessionByIdSchema), async (req: Request, res: Response) => {
  const sessionId = req.params.id;
  const userId = req.userId;

  const session = await getSessionById(sessionId);
  if(!session) return res.sendStatus(404);
  const movie = await getMovieById(session.movieId);
  if(!movie) return res.sendStatus(400);
  const theatre = await getTheatreById(session.theatreId);
  if(!movie) return res.sendStatus(400);

  const allBookings = await getBookingsBySessionId(sessionId);
  const userBookings = await getBookingsByFilter({ sessionId, userId });

  const occupiedSeats = allBookings.map(b => (b.seats)).flat();
  const userSeats = userBookings.map(b => (b.seats)).flat();

  // TODO: calculate user booked seats
  return res.status(200).json({ ...session, movie, theatre, occupiedSeats, userSeats });
})

export default sessionHandler;