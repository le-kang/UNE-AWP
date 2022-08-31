import 'dotenv/config'
import connect from './connectDB'

import UserModel from '../model/user.model'
import users from '../data/user.json'

import MovieModel from '../model/movie.model'
import movies from '../data/movies.json'

import SessionModel from '../model/session.model'
import sessions from '../data/sessions.json'

import TheatreModel from '../model/theatre.model'
import theatres from '../data/theatres.json'

import BookingModel from '../model/booking.model'
import bookings from '../data/bookings.json'

const run = async () => {
  try {
    await connect()

    await UserModel.deleteMany()
    await UserModel.insertMany(users)

    await MovieModel.deleteMany()
    await MovieModel.insertMany(movies)

    await SessionModel.deleteMany()
    await SessionModel.insertMany(sessions)

    await TheatreModel.deleteMany()
    await TheatreModel.insertMany(theatres)

    await BookingModel.deleteMany()
    await BookingModel.insertMany(bookings)

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

run()
