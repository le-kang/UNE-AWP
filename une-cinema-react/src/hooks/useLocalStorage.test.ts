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
  it('should remove the key from the storage if the value is undefined', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | undefined>(key, 'test')
    )
    const [initialStoredValue, setValue] = result.current
    expect(initialStoredValue).toEqual('test')
    act(() => {
      setValue(undefined)
    })
    const [storedValue] = result.current
    expect(storedValue).toEqual(undefined)
    expect(localStorage.getItem(key)).toEqual(null)
  })
  afterEach(() => {
    localStorage.removeItem(key)
  })
})
