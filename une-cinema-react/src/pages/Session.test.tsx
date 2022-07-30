import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Session from './Session'

const sessionId = 1
const movieId = 1
const theaterId = 1
const movieTitle = 'A movie'
const time = '7:15PM'
const rows = 5
const seats = 6

jest.mock('../data/movies.json', () => [
  {
    id: movieId,
    title: movieTitle,
  },
])

jest.mock('../data/sessions.json', () => [
  {
    id: sessionId,
    movieId,
    theaterId,
    time,
  },
])

jest.mock('../data/theaters.json', () => [
  {
    id: theaterId,
    rows,
    seats,
  },
])

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <p>Unauthenticated</p>,
  useParams: () => ({ sessionId }),
  useNavigate: () => mockUseNavigate,
}))

const mockUseContext = jest.fn()
React.useContext = mockUseContext

const mockSaveBooking = jest.fn()
jest.mock('../hooks', () => ({
  useLocalStorage: () => [[], mockSaveBooking],
}))

describe('Session page', () => {
  it('should not render the page if the user is not logged in', () => {
    mockUseContext.mockReturnValue({ user: undefined })
    render(<Session />)
    expect(screen.getByText('Unauthenticated')).toBeInTheDocument()
  })
  it('should render session page if the user has logged in', () => {
    mockUseContext.mockReturnValue({
      user: { username: 'user' },
    })
    render(<Session />)
    expect(screen.getByText(`${movieTitle} @${time}`)).toBeInTheDocument()
    expect(screen.getByText('SCREEN')).toBeInTheDocument()
    expect(screen.getAllByTestId('seat')).toHaveLength(rows * seats)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })
  it('should invoke the save bookings function and navigate the user to bookings page when the user clicks on the confirm button', () => {
    mockUseContext.mockReturnValue({
      user: { username: 'user' },
    })
    render(<Session />)
    fireEvent.click(screen.getAllByTestId('seat')[0])
    fireEvent.click(screen.getByText('Confirm'))
    expect(mockSaveBooking).toBeCalledWith({ [`session-${sessionId}`]: [0] })
    expect(mockUseNavigate).toBeCalledWith('/bookings')
  })
  afterEach(() => {
    mockUseContext.mockReset()
  })
})
