import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components'
import { Home, Login, SignUp, Movie, Session, Bookings } from './pages'

import style from './App.module.css'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
