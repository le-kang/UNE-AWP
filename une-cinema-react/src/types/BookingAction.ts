import { BookingActionType } from '../constants'

export type BookingAction = {
  type: BookingActionType
  payload: number
}
