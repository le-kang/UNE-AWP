import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import { Seat } from '../components'
import movies from '../data/movies.json'
import sessions from '../data/sessions.json'
import theaters from '../data/theaters.json'

import style from './Session.module.css'

export default function Session() {
  const { user } = useContext(UserContext)
  const { sessionId } = useParams()
  if (!user) return <Navigate to="/login" replace />
  if (!sessionId) return null
  const session = sessions.find((s) => s.id === parseInt(sessionId))
  if (!session) return null
  const theater = theaters.find((t) => t.id === session.theaterId)
  if (!theater) return null
  const { rows, seats } = theater

  return (
    <div className={style.container}>
      <h1 className={style.header}>
        {movies.find((m) => m.id === session.movieId)?.title} @{session.time}
      </h1>
      <div className={style.theater}>
        <div className={style.screen}>SCREEN</div>
        <div
          className={style.seats}
          style={{ gridTemplateColumns: `repeat(${seats}, 1fr)` }}
        >
          {[...Array(seats * rows)].map((_, index) => (
            <Seat key={`seat-${index}`} id={index} />
          ))}
        </div>
      </div>
      <button className={style.button}>Confirm</button>
    </div>
  )
}
