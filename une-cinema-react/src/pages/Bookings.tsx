import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import movies from '../data/movies.json'
import sessions from '../data/sessions.json'
import style from './Bookings.module.css'

export default function Bookings() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [bookings] = useLocalStorage<Record<string, number[]>>('bookings', {})
  if (!user) return <Navigate to="/login" />
  return (
    <div className={style.container}>
      <h1 className={style.header}>
        You have {Object.keys(bookings).length} bookings
      </h1>
      {Object.keys(bookings).map((key) => {
        const sessionId = key.split('-')[1]
        const session = sessions.find((s) => s.id === parseInt(sessionId))
        if (!session) return null
        const seatsNumber = bookings[key].length
        if (seatsNumber === 0) return null
        const movieTitle = movies.find((m) => m.id === session.movieId)?.title
        return (
          <div className={style.list} key={key}>
            <p className={style.title}>
              {movieTitle} @{session.time}
            </p>
            <p>
              {seatsNumber} {seatsNumber > 1 ? 'seats' : 'seat'} booked
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/session/${sessionId}`)}
            >
              View/Edit
            </button>
          </div>
        )
      })}
    </div>
  )
}
