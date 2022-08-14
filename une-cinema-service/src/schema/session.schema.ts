import { number, object, TypeOf } from "zod";

const params = {
  params: object({
    movieId: number({
      required_error: "Movie id is required",
    }),
  }),
};

const getSessionByIdSchema = object({
  ...params
})

export type GetSessionByMovieIdInput = TypeOf<typeof getSessionByIdSchema>;