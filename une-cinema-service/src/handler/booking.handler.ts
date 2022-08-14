import express, { Request, Response } from "express";

import validateSchema from '../middleware/validateSchema';

import { createBookingSchema, updateBookingScehma, deleteBookingScehma, getBookingsSchema } from '../schema/booking.schema';

const bookingHandler = express.Router();

// Get bookings
bookingHandler.get("/session/:sessionId", validateSchema(getBookingsSchema), (req: Request, res: Response) => {
  res.status(200).json([
    {
      sessionId: '10970b46-ecf7-4024-b0db-e429f3d76254',
      row: 3,
      seat: 5
    },
    {
      sessionId: '10970b46-ecf7-4024-b0db-e429f3d76254',
      row: 1,
      seat: 8
    }
  ])
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