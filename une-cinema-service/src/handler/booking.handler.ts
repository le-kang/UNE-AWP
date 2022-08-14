import express, { Request, Response } from "express";

import validateSchema from '../middleware/validateSchema';

import { createBookingSchema, updateBookingScehma, deleteBookingScehma, getBookingsSchema } from '../schema/booking.schema';
import { getRichBookingsDetailsByUserId } from "../service/booking.service";

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
bookingHandler.post("/", validateSchema(createBookingSchema), (req: Request, res: Response) => {
  // TODO: save into storage
  const booking = req.body;
  res.status(200).json(booking)
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