import movies from '../data/movies.json'

export default function Home() {
  return (
    <div className="container">
      {movies.map((movie) => (
        <div className="movie" key={movie.id}>
          <img className="poster" src={movie.poster} alt={movie.title} />
          <div className="title">{movie.title}</div>
        </div>
      ))}
    </div>
  )
}
