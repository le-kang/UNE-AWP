import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { intersection } from "lodash";

import validateSchema from '../middleware/validateSchema';

import { createBookingSchema, updateBookingScehma, deleteBookingScehma } from '../schema/booking.schema';
import { getRichBookingsDetailsByUserId, getBookingsByFilter, createBooking, updateBooking, deletBooking } from "../service/booking.service";

const bookingHandler = express.Router();

// Get bookings for current user
bookingHandler.get("/", async (req: Request, res: Response) => {
  // TODO: decode user id from token
  const userId = "62f88bd5e67347af189c4baa";

  // introducing Mongoose aggregate
  const bookings = await getRichBookingsDetailsByUserId(userId);

  res.status(200).json(bookings)
})

// Create a booking
bookingHandler.post("/", validateSchema(createBookingSchema), async (req: Request, res: Response) => {
  // TODO: decode user id from token
  const userId = "62f88bd5e67347af189c4baa";
  const booking = req.body;
  const bookingsForTheSession = await getBookingsByFilter({ sessionId: new mongoose.Types.ObjectId(booking.sessionId)});
  const allOccupiedSeats = bookingsForTheSession.length ? bookingsForTheSession.map(b => (b.seats)).flat() : [];
  const overlappingSeats = !!intersection(allOccupiedSeats, booking.seats).length;
  if(overlappingSeats) return res.sendStatus(400);
  
  const newBooking = await createBooking({ ...booking, userId});
  return res.status(200).send(newBooking);
})

// Modify a booking
bookingHandler.put("/:id", validateSchema(updateBookingScehma), async (req: Request, res: Response) => {
  // TODO: decode user id from token
  const userId = "62f88bd5e67347af189c4baa";
  const booking = req.body;
  const bookingId = req.params.id;
  const bookingsForTheSession = await getBookingsByFilter({ sessionId: new mongoose.Types.ObjectId(booking.sessionId), _id: {$ne: new mongoose.Types.ObjectId(bookingId)} });
  const allOccupiedSeats = bookingsForTheSession.length ? bookingsForTheSession.map(b => (b.seats)).flat() : [];
  const overlappingSeats = !!intersection(allOccupiedSeats, booking.seats).length;
  if(overlappingSeats) return res.sendStatus(400);

  const newBooking = await updateBooking(bookingId, { ...booking, userId });
  if(!newBooking) return res.sendStatus(404)
  return res.status(200).json(newBooking)
})

bookingHandler.delete("/:id", validateSchema(deleteBookingScehma), async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  await deletBooking(bookingId);
  res.sendStatus(200);
})

export default bookingHandler;