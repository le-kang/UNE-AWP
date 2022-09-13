import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Session from './Session'
import { post } from '../utils/http'
import { API_HOST } from '../constants'

const sessionId = 'session-1'
const movieId = 'movie-1'
const theaterId = 'theater-1'
const movieTitle = 'A movie'
const time = '7:15PM'
const rows = 5
const seats = 6

jest.mock('../utils/http', () => ({
  get: () =>
    Promise.resolve({
      _id: sessionId,
      movie: {
        _id: movieId,
        title: movieTitle,
      },
      theatre: {
        _id: theaterId,
        rows,
        seats,
      },
      occupiedSeats: [],
      userSeats: [],
      time,
    }),
  post: jest.fn(),
  put: jest.fn(),
  del: jest.fn(),
}))

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <p>Unauthenticated</p>,
  useParams: () => ({ sessionId }),
  useNavigate: () => mockUseNavigate,
}))

const mockUseContext = jest.fn()
React.useContext = mockUseContext

describe('Session page', () => {
  it('should not render the page if the user is not logged in', () => {
    mockUseContext.mockReturnValue({ user: undefined })
    render(<Session />)
    expect(screen.getByText('Unauthenticated')).toBeInTheDocument()
  })
  it('should render session page if the user has logged in', async () => {
    mockUseContext.mockReturnValue({
      user: { _id: 'user', token: 'token' },
    })
    render(<Session />)
    await screen.findByText(`${movieTitle} @${time}`)
    await screen.findByText('SCREEN')
    expect(await screen.findAllByTestId('seat')).toHaveLength(rows * seats)
    await screen.findByText('Confirm')
  })
  it('should invoke the post api to create a new booking and navigate the user to bookings page when the user clicks on the confirm button', async () => {
    mockUseContext.mockReturnValue({
      user: { _id: 'user', token: 'token' },
    })
    render(<Session />)
    await screen.findByText('Confirm')
    fireEvent.click(screen.getAllByTestId('seat')[0])
    fireEvent.click(screen.getByText('Confirm'))
    expect(post).toBeCalledWith(`${API_HOST}/api/bookings`, {
      sessionId,
      seats: [0],
    })
    await waitFor(() => expect(mockUseNavigate).toBeCalledWith('/bookings'))
  })
  afterEach(() => {
    mockUseContext.mockReset()
  })
})
