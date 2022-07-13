import { useNavigate, useParams } from 'react-router-dom'
import movies from '../data/movies.json'
import sessions from '../data/sessions.json'

import style from './Movie.module.css'

export default function Movie() {
  const navigate = useNavigate()
  const { movieId } = useParams()
  if (!movieId) return null
  const movie = movies.find((m) => m.id === parseInt(movieId))
  if (!movie) return null

  return (
    <div className={style.container}>
      <img className={style.poster} src={movie.poster} alt={movie.title} />
      <h1 className={style.title}>{movie.title}</h1>
      <div className={style.details}>
        <p>
          <strong>Directors: </strong>
          {movie.directors.join(', ')}
        </p>
        <p>
          <strong>Stars: </strong>
          {movie.stars.join(', ')}
        </p>
        <p>
          <strong>Duration: </strong>
          {movie.duration}
        </p>
      </div>
      <div className={style.description}>{movie.description}</div>
      <div className={style.sessions}>
        {sessions
          .filter((session) => session.movieId === parseInt(movieId))
          .map((session) => (
            <button
              key={session.id}
              className={style.session}
              onClick={() => navigate(`../session/${session.id}`)}
            >
              {session.time}
            </button>
          ))}
      </div>
    </div>
  )
}
