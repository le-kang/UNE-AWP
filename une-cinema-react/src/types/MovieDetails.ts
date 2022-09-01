import type { Session } from './Session'

export type MovieDetails = {
  _id: string
  title: string
  description: string
  duration: number
  directors: string[]
  stars: string[]
  poster: string
  sessions: Session[]
}
