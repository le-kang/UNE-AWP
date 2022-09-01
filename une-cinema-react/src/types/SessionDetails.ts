import type { Movie } from './Movie'
import type { Theatre } from './Theatre'

export type SessionDetails = {
  _id: string
  movie: Movie
  theatre: Theatre
  occupiedSeats: number[]
  userSeats: number[]
  userBookingId?: string
  time: string
}
