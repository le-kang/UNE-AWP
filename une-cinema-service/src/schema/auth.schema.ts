import { object, string, number, array, TypeOf, union } from 'zod'

const payload = {
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
}

export const registerSchema = object({
  ...payload,
})

export const loginSchema = object({
  ...payload,
})

export type RegisterInput = TypeOf<typeof registerSchema>
export type LoginInput = TypeOf<typeof loginSchema>
