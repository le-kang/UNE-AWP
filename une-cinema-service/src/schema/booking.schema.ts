import { object, string, number, array, TypeOf } from 'zod'

const payload = {
  body: object({
    sessionId: string({
      required_error: 'Session id is required',
    }),
    seats: array(
      number({
        required_error: 'Seats are required',
      })
    ).nonempty(),
  }),
}

const getParams = {
  params: object({
    sessionId: string({
      required_error: 'Session id is required',
    }),
  }),
}

const updateDeleteParams = {
  params: object({
    id: string({
      required_error: 'Booking id is required',
    }),
  }),
}

export const createBookingSchema = object({
  ...payload,
})
export const updateBookingSchema = object({
  ...payload,
  ...updateDeleteParams,
})
export const deleteBookingSchema = object({
  ...updateDeleteParams,
})
export const getBookingsSchema = object({
  ...getParams,
})

export type CreateBookingInput = TypeOf<typeof createBookingSchema>
export type UpdateBookingInput = TypeOf<typeof updateBookingSchema>
export type ReadBookingsInput = TypeOf<typeof getBookingsSchema>
export type DeleteBookingInput = TypeOf<typeof deleteBookingSchema>
