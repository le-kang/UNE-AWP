import express, { Request, Response } from 'express'

import { getSessionByIdSchema } from '../schema/session.schema'
import validateSchema from '../middleware/validateSchema'
import { getSessionById } from '../service/session.service'
import { getMovieById } from '../service/movie.service'
import { getTheatreById } from '../service/theatre.service'
import {
  getBookingsBySessionId,
  getBookingByFilter,
} from '../service/booking.service'
import { deserializeUser } from '../middleware/deserializeUser'

const sessionHandler = express.Router()

sessionHandler.use(deserializeUser)

// Get session details, expecting movie, session, theatre, booked seats and occupied seats
sessionHandler.get(
  '/:id',
  validateSchema(getSessionByIdSchema),
  async (req: Request, res: Response) => {
    const sessionId = req.params.id
    const userId = req.userId

    const session = await getSessionById(sessionId)
    if (!session) return res.sendStatus(404)
    const movie = await getMovieById(session.movieId)
    if (!movie) return res.sendStatus(400)
    const theatre = await getTheatreById(session.theatreId)
    if (!movie) return res.sendStatus(400)

    const allBookings = await getBookingsBySessionId(sessionId)
    const userBooking = await getBookingByFilter({ sessionId, userId })

    const userBookingId = userBooking?._id
    const userSeats = userBooking?.seats || []
    const occupiedSeats = allBookings
      .map((b) => b.seats)
      .flat()
      .filter((s) => !userSeats.find((userSeat) => userSeat === s))

    return res.status(200).json({
      ...session,
      movie,
      theatre,
      occupiedSeats,
      userSeats,
      userBookingId,
    })
  }
)

export default sessionHandler
