import { BookingActionType } from '../constants'

export type BookingAction =
  | {
      type: BookingActionType.SELECT | BookingActionType.DESELECT
      payload: number
    }
  | {
      type: BookingActionType.INITIALISE
      payload: number[]
    }
