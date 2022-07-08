import './App.css'
import movies from './data/movies.json'

function App() {
  return (
    <>
      <header className="header">UNE Cinema</header>
      <main className="main">
        <div className="container">
          {movies.map((movie) => (
            <div className="movie" key={movie.id}>
              <img className="poster" src={movie.poster} alt={movie.title} />
              <div className="title">{movie.title}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
