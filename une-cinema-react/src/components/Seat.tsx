import { useState } from 'react'
import { SEAT_STATUS } from '../constants'

import style from './Seat.module.css'

type SeatProps = {
  id: number
}

export default function Seat(props: SeatProps) {
  const { id } = props
  const [status, setStatus] = useState(SEAT_STATUS.AVAILABLE)

  const getClassNames = () => {
    const className = style.seat
    switch (status) {
      case SEAT_STATUS.AVAILABLE:
        return `${className} ${style.available}`
      case SEAT_STATUS.SELECTED:
        return `${className} ${style.selected}`
      case SEAT_STATUS.OCCUPIED:
        return `${className} ${style.occupied}`
      default:
        return className
    }
  }

  const handleClick = () => {
    if (status === SEAT_STATUS.AVAILABLE) {
      console.log('select seat', id)
      setStatus(SEAT_STATUS.SELECTED)
    } else if (status === SEAT_STATUS.SELECTED) {
      console.log('deselect seat', id)
      setStatus(SEAT_STATUS.AVAILABLE)
    }
  }

  return <div className={getClassNames()} onClick={handleClick} />
}
