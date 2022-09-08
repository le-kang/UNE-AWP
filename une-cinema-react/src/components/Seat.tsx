import { useState, memo, useEffect } from 'react'
import { BookingActionType, SEAT_STATUS } from '../constants'
import { BookingAction } from '../types'

import style from './Seat.module.css'

type SeatProps = {
  id: number
  isSelected?: boolean
  isOccupied?: boolean
  dispatch: React.Dispatch<BookingAction>
}

const getClassNames = (status: SEAT_STATUS) => {
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

export default memo(function Seat(props: SeatProps) {
  const { id, dispatch, isSelected = false, isOccupied = false } = props
  const [status, setStatus] = useState(
    isOccupied
      ? SEAT_STATUS.OCCUPIED
      : isSelected
      ? SEAT_STATUS.SELECTED
      : SEAT_STATUS.AVAILABLE
  )

  useEffect(() => {
    setStatus(
      isOccupied
        ? SEAT_STATUS.OCCUPIED
        : isSelected
        ? SEAT_STATUS.SELECTED
        : SEAT_STATUS.AVAILABLE
    )
  }, [isOccupied, isSelected])

  const handleClick = () => {
    if (status === SEAT_STATUS.AVAILABLE) {
      setStatus(SEAT_STATUS.SELECTED)
      dispatch({ type: BookingActionType.SELECT, payload: id })
    } else if (status === SEAT_STATUS.SELECTED) {
      setStatus(SEAT_STATUS.AVAILABLE)
      dispatch({ type: BookingActionType.DESELECT, payload: id })
    }
  }

  return (
    <div
      className={getClassNames(status)}
      onClick={handleClick}
      data-testid="seat"
    />
  )
})
