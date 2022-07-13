import { useNavigate } from 'react-router-dom'
import style from './MovieItem.module.css'

type MovieItemProps = {
  id: number
  title: string
  poster: string
}

export default function MovieItem(props: MovieItemProps) {
  const { id, title, poster } = props
  const navigate = useNavigate()

  return (
    <div className={style.movie}>
      <img className={style.poster} src={poster} alt={title} />
      <div className={style.title}>{title}</div>
      <button className={style.button} onClick={() => navigate(`movie/${id}`)}>
        More info
      </button>
    </div>
  )
}
