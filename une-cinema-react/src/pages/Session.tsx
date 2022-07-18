import { useContext, useReducer } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import { Seat } from '../components'
import movies from '../data/movies.json'
import sessions from '../data/sessions.json'
import theaters from '../data/theaters.json'
import { BookingActionType } from '../constants'

import style from './Session.module.css'

type BookingAction = {
  type: BookingActionType
  payload: number
}

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

export default function Session() {
  const { user } = useContext(UserContext)
  const [state, dispatch] = useReducer(bookingReducer, [])
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
            <Seat
              key={`seat-${index}`}
              id={index}
              onSelect={() =>
                dispatch({ type: BookingActionType.SELECT, payload: index })
              }
              onDeselect={() =>
                dispatch({ type: BookingActionType.DESELECT, payload: index })
              }
            />
          ))}
        </div>
      </div>
      <button className={style.button} onClick={() => console.log(state)}>
        Confirm
      </button>
    </div>
  )
}
