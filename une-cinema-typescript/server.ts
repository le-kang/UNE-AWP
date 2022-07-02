import express, { Express, Request, Response } from 'express'
import cors from 'cors'

const app: Express = express()

app.use(cors())

const movies = [
  {
    id: 1,
    title: 'Jurassic World Dominion',
    poster:
      'https://cdn.eventcinemas.com.au/cdn/resources/movies/15020/images/largeposter.jpg',
    theater: {
      rowNumber: 8,
      seatNumberPerRow: 8,
    },
  },
  {
    id: 2,
    title: 'Top Gun: Maverick',
    poster:
      'https://cdn.eventcinemas.com.au/cdn/resources/movies/14621/images/largeposter.jpg',
    theater: {
      rowNumber: 10,
      seatNumberPerRow: 12,
      occupiedSeats: [3, 4, 33, 34],
    },
  },
  {
    id: 3,
    title: 'Doctor Strange in the Multiverse of Madness',
    poster:
      'https://cdn.eventcinemas.com.au/cdn/resources/movies/15657/images/largeposter.jpg',
    theater: {
      rowNumber: 9,
      seatNumberPerRow: 13,
      occupiedSeats: [15, 16, 22, 34, 35],
    },
  },
]

app.get('/movies', (req: Request, res: Response) => {
  res.send(movies)
})

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:8000`)
})
