import { render, screen, fireEvent } from '@testing-library/react'

import MovieItem from './MovieItem'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

const movieItemProps = {
  id: 1,
  title: 'A movie',
  poster: 'poster-link',
}

describe('MovieItem component', () => {
  it('should render a movie item with poster image, title, and a navigate button', () => {
    render(<MovieItem {...movieItemProps} />)
    const posterImage = screen.getByRole('img')
    const title = screen.getByText(movieItemProps.title)
    const button = screen.getByText('More info')
    expect(posterImage).toBeInTheDocument()
    expect(posterImage).toHaveAttribute('src', movieItemProps.poster)
    expect(title).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should navigate to the movie details page if the user clicks on the button of the movie item', () => {
    render(<MovieItem {...movieItemProps} />)
    const button = screen.getByText('More info')
    fireEvent.click(button)
    expect(mockUseNavigate).toBeCalledWith(`movie/${movieItemProps.id}`)
  })
})
