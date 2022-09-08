import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import { intersection } from 'lodash'

import validateSchema from '../middleware/validateSchema'

import { wss } from '../websocket'
import {
  createBookingSchema,
  updateBookingSchema,
  deleteBookingSchema,
} from '../schema/booking.schema'
import {
  getRichBookingsDetailsByUserId,
  getBookingsByFilter,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingByFilter,
} from '../service/booking.service'
import { deserializeUser } from '../middleware/deserializeUser'

const bookingHandler = express.Router()
bookingHandler.use(deserializeUser)

// Get bookings for current user
bookingHandler.get('/', async (req: Request, res: Response) => {
  // TODO: decode user id from token
  const userId = req.userId

  // introducing Mongoose aggregate
  const bookings = await getRichBookingsDetailsByUserId(userId)

  return res.status(200).json(bookings)
})

// Create a booking
bookingHandler.post(
  '/',
  validateSchema(createBookingSchema),
  async (req: Request, res: Response) => {
    // TODO: decode user id from token
    const userId = req.userId
    const booking = req.body
    const bookingsForTheSession = await getBookingsByFilter({
      sessionId: new mongoose.Types.ObjectId(booking.sessionId),
    })
    const allOccupiedSeats = bookingsForTheSession.length
      ? bookingsForTheSession.map((b) => b.seats).flat()
      : []
    const overlappingSeats = !!intersection(allOccupiedSeats, booking.seats)
      .length
    if (overlappingSeats) return res.sendStatus(400)

    const newBooking = await createBooking({ ...booking, userId })
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            updateBy: userId,
            sessionId: booking.sessionId,
            occupiedSeats: [...allOccupiedSeats, ...booking.seats],
          })
        )
      }
    })
    return res.status(200).send(newBooking)
  }
)

// Modify a booking
bookingHandler.put(
  '/:id',
  validateSchema(updateBookingSchema),
  async (req: Request, res: Response) => {
    // TODO: decode user id from token
    const userId = req.userId
    const booking = req.body
    const bookingId = req.params.id

    const bookingsForTheSession = await getBookingsByFilter({
      sessionId: new mongoose.Types.ObjectId(booking.sessionId),
      _id: { $ne: new mongoose.Types.ObjectId(bookingId) },
    })
    const allOccupiedSeats = bookingsForTheSession.length
      ? bookingsForTheSession.map((b) => b.seats).flat()
      : []
    const overlappingSeats = !!intersection(allOccupiedSeats, booking.seats)
      .length
    if (overlappingSeats) return res.sendStatus(400)

    const newBooking = await updateBooking(bookingId, userId, {
      ...booking,
      userId,
    })
    if (!newBooking) return res.sendStatus(404)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            updateBy: userId,
            sessionId: booking.sessionId,
            occupiedSeats: [...allOccupiedSeats, ...booking.seats],
          })
        )
      }
    })
    return res.status(200).json(newBooking)
  }
)

bookingHandler.delete(
  '/:id',
  validateSchema(deleteBookingSchema),
  async (req: Request, res: Response) => {
    const bookingId = req.params.id
    const booking = await getBookingByFilter({
      _id: new mongoose.Types.ObjectId(bookingId),
    })
    if (!booking) {
      return res.sendStatus(404)
    }
    const bookingsForTheSession = await getBookingsByFilter({
      sessionId: new mongoose.Types.ObjectId(booking.sessionId),
      _id: { $ne: new mongoose.Types.ObjectId(bookingId) },
    })
    const allOccupiedSeats = bookingsForTheSession.length
      ? bookingsForTheSession.map((b) => b.seats).flat()
      : []
    const userId = req.userId
    await deleteBooking(bookingId, userId)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            updateBy: userId,
            sessionId: booking.sessionId,
            occupiedSeats: [...allOccupiedSeats],
          })
        )
      }
    })
    return res.sendStatus(200)
  }
)

export default bookingHandler
