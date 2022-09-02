import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import type { MovieDetails } from '../types'
import { get } from '../utils/http'
import style from './Movie.module.css'

export default function Movie() {
  const navigate = useNavigate()
  const { movieId = '' } = useParams()
  const [movie, setMovie] = useState<MovieDetails>()

  const fetchMovieDetails = async (id: string) => {
    const fetchedMovie = await get<MovieDetails>(`/api/movies/${id}`)
    setMovie(fetchedMovie)
  }

  useEffect(() => {
    fetchMovieDetails(movieId)
  }, [movieId])

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
        {movie.sessions.map((session) => (
          <button
            key={session._id}
            className={style.session}
            onClick={() => navigate(`../session/${session._id}`)}
          >
            {session.time}
          </button>
        ))}
      </div>
    </div>
  )
}
