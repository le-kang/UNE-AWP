import { NextFunction, Request, Response } from 'express'
import { getUserById, getUserByUsername } from '../service/auth.service'
import { verifyJwt } from '../util/jwt'

interface TokenBody {
  username: string
  _id: string
  iat: number
  exp: number
}

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(403).send('Token missing')
    }

    // Validate Access Token
    const decoded = verifyJwt<TokenBody>(token)

    if (!decoded) {
      return res.status(401).send('Invalid token')
    }

    const user = await getUserById(decoded._id)

    if (!user) {
      return res.status(401).send('Invalid user')
    }

    // Inject user id into request
    req.userId = user._id
    next()
  } catch (err: any) {
    next(err)
  }
}
