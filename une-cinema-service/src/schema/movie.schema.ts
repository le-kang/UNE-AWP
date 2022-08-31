import { string, object, TypeOf } from 'zod'

const params = {
  params: object({
    id: string({
      required_error: 'Movie id is required',
    }),
  }),
}

export const getMovieByIdSchema = object({
  ...params,
})

export type getMovieByIdInput = TypeOf<typeof getMovieByIdSchema>
