import {
  useContext,
  useCallback,
  useReducer,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { UserContext } from '../context'
import { Seat } from '../components'
import { API_HOST, BookingActionType } from '../constants'
import { BookingAction, SessionDetails } from '../types'
import { get, post, put, del } from '../utils/http'

import style from './Session.module.css'

function bookingReducer(state: number[], action: BookingAction) {
  const { type, payload } = action
  switch (type) {
    case BookingActionType.INITIALISE:
      return payload
    case BookingActionType.SELECT:
      return [...state, payload]
    case BookingActionType.DESELECT:
      return state.filter((seat) => seat !== payload)
    default:
      return state
  }
}

const getWebSocketURL = () => {
  if (!API_HOST) return 'ws://localhost:8080'
  const hostURL = new URL(API_HOST)
  return `${hostURL.protocol === 'https:' ? `wss` : `ws`}://${hostURL.hostname}`
}

export default function Session() {
  const { user, logout } = useContext(UserContext)
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>()
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([])
  const [selectedSeats, dispatch] = useReducer(bookingReducer, [])
  const ws = useMemo(() => new WebSocket(getWebSocketURL()), [])
  const notify = (message: string) => toast(message)

  const fetchSessionDetails = useCallback(async () => {
    try {
      const result = await get<SessionDetails>(
        `${API_HOST}/api/sessions/${sessionId}`
      )
      setSessionDetails(result)
      setOccupiedSeats(result.occupiedSeats)
      dispatch({
        type: BookingActionType.INITIALISE,
        payload: result.userSeats,
      })
    } catch (error) {
      console.log((error as Error).message)
      logout()
      navigate('/')
    }
  }, [logout, navigate, sessionId])

  useEffect(() => {
    if (!user) return
    fetchSessionDetails().then(() => {
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (
            typeof data === 'object' &&
            data.undatedBy !== user._id &&
            'occupiedSeats' in data
          ) {
            setOccupiedSeats(data.occupiedSeats)
            notify('Seat map is updated')
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log('closing websocket connection')
        ws.close()
      }
    }
  }, [fetchSessionDetails, user, ws])

  if (!user) return <Navigate to="/login" replace />
  if (!sessionDetails) return null

  const { rows, seats } = sessionDetails.theatre

  const handleConfirmClick = async () => {
    if (!sessionDetails.userBookingId) {
      await post(`${API_HOST}/api/bookings`, {
        sessionId,
        seats: selectedSeats,
      })
    } else if (selectedSeats.length === 0) {
      await del(`${API_HOST}/api/bookings/${sessionDetails.userBookingId}`)
    } else {
      await put(`${API_HOST}/api/bookings/${sessionDetails.userBookingId}`, {
        sessionId,
        seats: selectedSeats,
      })
    }
    navigate('/bookings')
  }

  return (
    <div className={style.container}>
      <h1 className={style.header}>
        {sessionDetails.movie.title} @{sessionDetails.time}
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
              isOccupied={occupiedSeats.includes(index)}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
      <button className={style.button} onClick={handleConfirmClick}>
        Confirm
      </button>
      <ToastContainer />
    </div>
  )
}
