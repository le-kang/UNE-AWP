import { render, screen, fireEvent } from '@testing-library/react'

import Button from './Button'

describe('Button component', () => {
  it('should render a button', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByText('Test Button')
    expect(button).toBeInTheDocument()
  })

  it('should call the click handler function if the user clicks the button', () => {
    const clickHandler = jest.fn()
    render(<Button onClick={clickHandler}>Test Button</Button>)
    const button = screen.getByText('Test Button')
    fireEvent.click(button)
    expect(clickHandler).toBeCalled()
  })
})
