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

  constructor(id: number, seatNumber: number) {
    this.id = id
    this.seats = Array.from({ length: seatNumber }).map((_, index) => {
      const seatId = seatNumber * id + index
      return new Seat(seatId)
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

  constructor(rowNumber: number, seatNumberPerRow: number) {
    this.rows = Array.from({ length: rowNumber }).map((_, index) => {
      return new Row(index, seatNumberPerRow)
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
