import { createContext } from 'react'
import { User } from '../types'

type UserContextType = {
  user?: User
  login: (username: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext
