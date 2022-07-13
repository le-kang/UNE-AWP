import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'

export default function Session() {
  const { user } = useContext(UserContext)
  if (!user) return <Navigate to="/login" />
  return <div>Session</div>
}
