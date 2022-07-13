import { MovieItem } from '../components'
import movies from '../data/movies.json'

import style from './Home.module.css'

export default function Home() {
  return (
    <div className={style.container}>
      {movies.map(({ id, title, poster }) => (
        <MovieItem key={id} id={id} title={title} poster={poster} />
      ))}
    </div>
  )
}
