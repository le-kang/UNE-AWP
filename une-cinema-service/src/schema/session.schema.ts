import { string, object, TypeOf } from 'zod'

const params = {
  params: object({
    id: string({
      required_error: 'Session id is required',
    }),
  }),
}

export const getSessionByIdSchema = object({
  ...params,
})

export type GetSessionByIdInput = TypeOf<typeof getSessionByIdSchema>
