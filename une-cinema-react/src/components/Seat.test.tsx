import { render, screen, fireEvent } from '@testing-library/react'
import { BookingActionType } from '../constants'

import Seat from './Seat'

const testSeatId = 1
const mockSeatClickHandler = jest.fn()

describe('Seat component', () => {
  it('should update the status and invoke the dispatch function when the user clicks on it', () => {
    render(<Seat id={testSeatId} dispatch={mockSeatClickHandler} />)
    const seat = screen.getByTestId('seat')
    expect(seat).toHaveClass('available')
    fireEvent.click(seat)
    expect(mockSeatClickHandler).toBeCalledWith({
      type: BookingActionType.SELECT,
      payload: testSeatId,
    })
    expect(seat).not.toHaveClass('available')
    expect(seat).toHaveClass('selected')
  })
})
