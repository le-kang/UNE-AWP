import { useContext, useReducer } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { Seat } from '../components'
import { useLocalStorage } from '../hooks'
import movies from '../data/movies.json'
import sessions from '../data/sessions.json'
import theaters from '../data/theaters.json'
import { BookingActionType } from '../constants'
import { BookingAction } from '../types'

import style from './Session.module.css'

function bookingReducer(state: number[], action: BookingAction) {
  const { type, payload } = action
  switch (type) {
    case BookingActionType.SELECT:
      return [...state, payload]
    case BookingActionType.DESELECT:
      return state.filter((seat) => seat !== payload)
    default:
      return state
  }
}

// {
//   "session-1": [2,3]
//   "session-2": [0,1]
// }

export default function Session() {
  const { user } = useContext(UserContext)
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [bookings, saveBookings] = useLocalStorage<Record<string, number[]>>(
    'bookings',
    {}
  )
  const { [`session-${sessionId}`]: selectedSeats = [], ...otherBookings } =
    bookings
  const [state, dispatch] = useReducer(bookingReducer, selectedSeats)
  if (!user) return <Navigate to="/login" replace />
  if (!sessionId) return null
  const session = sessions.find((s) => s.id === parseInt(sessionId))
  if (!session) return null
  const theater = theaters.find((t) => t.id === session.theaterId)
  if (!theater) return null
  const { rows, seats } = theater

  const handleConfirmClick = () => {
    if (state.length > 0) {
      saveBookings({ ...bookings, [`session-${sessionId}`]: state })
    } else {
      saveBookings(otherBookings)
    }
    navigate('/bookings')
  }

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
            <Seat
              key={`seat-${index}`}
              id={index}
              isSelected={selectedSeats.includes(index)}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
      <button className={style.button} onClick={handleConfirmClick}>
        Confirm
      </button>
    </div>
  )
}
