import { Routes, Route, Navigate } from 'react-router-dom'
import { Header, UserProvider } from './components'
import { Home, Login, SignUp, Movie, Session, Bookings } from './pages'

import style from './App.module.css'

function App() {
  return (
    <UserProvider>
      <Header />
      <main className={style.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="session/:sessionId" element={<Session />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default App
