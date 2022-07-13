import { useEffect, useState } from 'react'
import { MovieItem } from '../components'
import type { Movie } from '../types'
import http from '../utils/http'

import style from './Home.module.css'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  const fetchMovies = async () => {
    const fetchedMovies = await http<Movie[]>(
      'https://une-cinema.free.beeceptor.com/api/movies'
    )
    setMovies(fetchedMovies)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className={style.container}>
      {movies.length === 0 && <p>Fetching movies...</p>}
      {movies.map(({ id, title, poster }) => (
        <MovieItem key={id} id={id} title={title} poster={poster} />
      ))}
    </div>
  )
}
