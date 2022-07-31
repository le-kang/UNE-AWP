import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import theatreHandler from './handler/theatres.handler';
import movieHandler from './handler/movie.handler';
import bookingHandler from './handler/booking.handler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/theatres', theatreHandler)
app.use('/movies', movieHandler);
app.use('/bookings', bookingHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});