import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { intersection } from "lodash";

import validateSchema from '../middleware/validateSchema';

import { createBookingSchema, updateBookingScehma, deleteBookingScehma, getBookingsSchema } from '../schema/booking.schema';
import { getRichBookingsDetailsByUserId, getBookingsByFilter, createBooking } from "../service/booking.service";

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
bookingHandler.put("/:id", validateSchema(updateBookingScehma), (req: Request, res: Response) => {
  // update in storage
  const booking = req.body;
  res.status(200).json(booking)
})

bookingHandler.delete("/:id", validateSchema(deleteBookingScehma), (req: Request, res: Response) => {
  console.log('Delete')
  // Delete in storage
  res.sendStatus(200);
})

export default bookingHandler;