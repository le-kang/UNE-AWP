import SeatMap from './SeatMap'
import http from './http'

type Theater = {
  rowNumber: number
  seatNumberPerRow: number
  occupiedSeats?: number[]
}

type Movie = {
  id: number
  title: string
  poster: string
  theater: Theater
}

export default class Cinema {
  movies: Movie[] = []
  seatMap: SeatMap | null = null
  theaterContainer: HTMLDivElement
  moviesContainer: HTMLDivElement
  movieElements: HTMLDivElement[] = []

  constructor() {
    this.moviesContainer = document.createElement('div')
    this.moviesContainer.id = 'movies'
    this.moviesContainer.classList.add('movies')
    this.theaterContainer = document.createElement('div')
    this.theaterContainer.id = 'theater'
    this.theaterContainer.classList.add('theater')
    const screenElement = document.createElement('div')
    screenElement.classList.add('screen')
    screenElement.innerText = 'Screen'
    this.theaterContainer.appendChild(screenElement)
    document
      .getElementById('cinema')
      ?.append(this.moviesContainer, this.theaterContainer)
  }

  async fetchMovies() {
    this.movies = await http<Movie[]>('http://localhost:8000/movies')
    if (this.movies.length) {
      this.renderMovies()
      this.selectMovie(0)
    }
  }

  renderMovies() {
    this.movieElements = []
    this.moviesContainer.innerHTML = ''
    this.movies.forEach((movie, index) => {
      const movieElement = document.createElement('div')
      movieElement.id = movie.id.toString()
      movieElement.classList.add('movie')
      movieElement.addEventListener('click', () => {
        if (!movieElement.classList.contains('selected')) {
          this.selectMovie(index)
        }
      })
      const posterElement = document.createElement('img')
      posterElement.classList.add('poster')
      posterElement.src = movie.poster
      const titleElement = document.createElement('div')
      titleElement.classList.add('title')
      titleElement.innerText = movie.title
      movieElement.append(posterElement, titleElement)
      this.movieElements.push(movieElement)
      this.moviesContainer.appendChild(movieElement)
    })
  }

  selectMovie(selectedIndex: number) {
    this.movieElements.forEach((element, index) =>
      selectedIndex === index
        ? element.classList.add('selected')
        : element.classList.remove('selected')
    )
    const {
      theater: { rowNumber, seatNumberPerRow, occupiedSeats },
    } = this.movies[selectedIndex]
    if (this.seatMap) {
      this.theaterContainer.lastChild?.remove()
    }
    this.seatMap = new SeatMap(rowNumber, seatNumberPerRow, occupiedSeats)
    this.theaterContainer.append(this.seatMap.element)
  }
}
