import { useContext, useCallback, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { get } from '../utils/http'
import { Booking } from '../types'

import style from './Bookings.module.css'

export default function Bookings() {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])

  const fetchBookings = useCallback(async () => {
    try {
      const result = await get<Booking[]>('/api/bookings')
      setBookings(result)
    } catch (error) {
      console.log((error as Error).message)
      logout()
      navigate('/')
    }
  }, [logout, navigate])

  useEffect(() => {
    if (!user) return
    fetchBookings()
  }, [fetchBookings, user])

  if (!user) return <Navigate to="/login" />
  return (
    <div className={style.container}>
      <h1 className={style.header}>You have {bookings.length} bookings</h1>
      {bookings.map(
        ({ _id, sessionId, sessionTime, seatCount, movieTitle }) => {
          return (
            <div className={style.list} key={_id}>
              <p className={style.title}>
                {movieTitle} @{sessionTime}
              </p>
              <p>
                {seatCount} {seatCount > 1 ? 'seats' : 'seat'} booked
              </p>
              <button
                className={style.button}
                onClick={() => navigate(`/session/${sessionId}`)}
              >
                View/Edit
              </button>
            </div>
          )
        }
      )}
    </div>
  )
}
