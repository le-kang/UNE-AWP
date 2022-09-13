import { createServer } from 'http'
import express, { Express } from 'express'
import cors from 'cors'

import theatreHandler from './handler/theatres.handler'
import movieHandler from './handler/movie.handler'
import bookingHandler from './handler/booking.handler'
import sessionHandler from './handler/session.handler'
import authHandler from './handler/auth.handler'

const app: Express = express()

app.use(
  cors({
    origin: process.env.allowHost || true,
  })
)

app.use(express.json())

app.use('/api/theatres', theatreHandler)
app.use('/api/movies', movieHandler)
app.use('/api/bookings', bookingHandler)
app.use('/api/sessions', sessionHandler)
app.use('/api/auth', authHandler)

export const server = createServer(app)

export default app
