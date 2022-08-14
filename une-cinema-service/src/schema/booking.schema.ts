import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    sessionId: string({
      required_error: "Session id is required",
    }),
    row: number({
      required_error: "Row is required",
    }),
    seat: number({
      required_error: "Seat is required",
    })
  })
}

const getParams = {
  params: object({
    sessionId: string({
      required_error: "Session id is required",
    }),
  }),
};

const updateDeleteParams = {
  params: object({
    id: string({
      required_error: "Booking id is required",
    }),
  }),
}

export const createBookingSchema = object({
  ...payload
});
export const updateBookingScehma = object({
  ...payload,
  ...updateDeleteParams
});
export const deleteBookingScehma = object({
  ...updateDeleteParams
})
export const getBookingsSchema = object({
  ...getParams
})


export type CreateBookingInput = TypeOf<typeof createBookingSchema>;
export type UpdateBookingInput = TypeOf<typeof updateBookingScehma>;
export type ReadBookingsInput = TypeOf<typeof getBookingsSchema>;
export type DeleteBookingInput = TypeOf<typeof deleteBookingScehma>;