import express, { Request, Response } from "express";

const bookingRouter = express.Router();

// Get bookings
bookingRouter.get("/session/:sessionId", (req: Request, res: Response) => {
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
bookingRouter.post("/", (req: Request, res: Response) => {
  // TODO: save into storage
  const booking = req.body;
  res.status(200).json(booking)
})

// Modify a booking
bookingRouter.put("/:id", (req: Request, res: Response) => {
  // update in storage
  const booking = req.body;
  res.status(200).json(booking)
})

bookingRouter.delete("/:id", (req: Request, res: Response) => {
  console.log('Delete')
  // Delete in storage
  res.sendStatus(200);
})

export default bookingRouter;