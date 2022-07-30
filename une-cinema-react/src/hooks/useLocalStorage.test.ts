import { renderHook, act } from '@testing-library/react'

import useLocalStorage from './useLocalStorage'

const key = 'stored-value'
const initialState = [0, 1, 2]

describe('useLocalStorage hook', () => {
  it('should return the initialState', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialState))
    const [storedValue] = result.current
    expect(storedValue).toEqual(initialState)
  })
  it('should return a setValue function that can store the value as serialised json in local storage', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialState))
    const [, setValue] = result.current
    const newValue = [1, 2]
    act(() => {
      setValue(newValue)
    })
    const [storedValue] = result.current
    expect(storedValue).toEqual(newValue)
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue))
  })
})
