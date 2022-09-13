import { useEffect, useState } from 'react'
import { MovieItem } from '../components'
import { API_HOST } from '../constants'
import type { Movie } from '../types'
import { get } from '../utils/http'

import style from './Home.module.css'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  const fetchMovies = async () => {
    const fetchedMovies = await get<Movie[]>(`${API_HOST}/api/movies`)
    setMovies(fetchedMovies)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className={style.container}>
      {movies.length === 0 && <p>Fetching movies...</p>}
      {movies.map(({ _id, title, poster }) => (
        <MovieItem key={_id} id={_id} title={title} poster={poster} />
      ))}
    </div>
  )
}
