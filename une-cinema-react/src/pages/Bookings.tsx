import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'

export default function Bookings() {
  const { user } = useContext(UserContext)
  if (!user) return <Navigate to="/login" />
  return <div>Bookings</div>
}
