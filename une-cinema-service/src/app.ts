import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import movieRouter from './router/movie.router';
import bookingRouter from './router/booking.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/movies', movieRouter);
app.use('/bookings', bookingRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});