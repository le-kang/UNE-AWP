enum STATUS {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  SELECTED = 'SELECTED',
}

class Seat {
  id: number
  status: STATUS
  element: HTMLDivElement

  constructor(id: number, isOccupied: boolean = false) {
    this.id = id
    this.status = isOccupied ? STATUS.OCCUPIED : STATUS.AVAILABLE
    this.element = document.createElement('div')
    this.element.classList.add('seat')
    this.element.classList.add(this.status.toLowerCase())
    this.element.addEventListener('click', () => {
      this.handleClick()
    })
  }

  handleClick() {
    if (this.status === STATUS.OCCUPIED) return
    this.element.classList.remove(this.status.toLowerCase())
    this.status =
      this.status === STATUS.AVAILABLE ? STATUS.SELECTED : STATUS.AVAILABLE
    this.element.classList.add(this.status.toLowerCase())
  }

  get isSelected() {
    return this.status === STATUS.SELECTED
  }
}

class Row {
  id: number
  seats: Seat[]
  element: HTMLDivElement

  constructor(id: number, seatNumber: number, occupiedSeats: number[] = []) {
    this.id = id
    this.seats = Array.from({ length: seatNumber }).map((_, index) => {
      const seatId = seatNumber * id + index
      return new Seat(seatId, occupiedSeats.includes(seatId))
    })
    this.element = document.createElement('div')
    this.element.classList.add('row')
    this.element.append(...this.seats.map((seat) => seat.element))
  }

  get selectedSeatsId() {
    return this.seats.filter((seat) => seat.isSelected).map((seat) => seat.id)
  }
}

class SeatMap {
  rows: Row[]
  selectedSeats: number[] = []
  element: HTMLDivElement

  constructor(
    rowNumber: number,
    seatNumberPerRow: number,
    occupiedSeats: number[] = []
  ) {
    this.rows = Array.from({ length: rowNumber }).map((_, index) => {
      return new Row(index, seatNumberPerRow, occupiedSeats)
    })
    this.element = document.createElement('div')
    this.element.classList.add('seat-map')
    this.element.append(...this.rows.map((row) => row.element))
    this.element.addEventListener('click', () => {
      this.getSelectedSeatsId()
    })
  }

  getSelectedSeatsId() {
    // this.selectedSeats = this.rows.reduce<number[]>((total, row) => {
    //   total = [...total, ...row.selectedSeatsId]
    //   return total
    // }, [])
    this.selectedSeats = this.rows.map((row) => row.selectedSeatsId).flat()
    console.log(`selected seats: ${this.selectedSeats.join(',')}`)
  }
}

const seatMap = new SeatMap(8, 10)
document.getElementById('theater')?.appendChild(seatMap.element)

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

async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const headers = response.headers
  const data = headers.get('content-type')?.includes('json')
    ? await response.json()
    : {}
  return data
}
class Cinema {
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

const cinema = new Cinema()
cinema.fetchMovies()
