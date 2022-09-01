import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose'
import BookingModel, { BookingDocument } from '../model/booking.model'

export async function getBookingsBySessionId(sessionId: string) {
  return await BookingModel.find({ sessionId }).lean()
}

export async function getRichBookingsDetailsByUserId(userId: string) {
  return await BookingModel.aggregate([
    // filter with userID
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    // join with session table
    {
      $lookup: {
        from: 'sessions',
        localField: 'sessionId',
        foreignField: '_id',
        as: 'sessionDetail',
        pipeline: [
          // keep only time and movieId
          {
            $project: {
              time: 1,
              movieId: 1,
            },
          },
        ],
      },
    },
    // join movie table
    {
      $lookup: {
        from: 'movies',
        localField: 'sessionDetail.movieId',
        foreignField: '_id',
        as: 'movieDetail',
        pipeline: [
          {
            $project: {
              title: 1,
            },
          },
        ],
      },
    },
    // transform the return with $project
    {
      $project: {
        userId: 1,
        sessionId: 1,
        seatCount: { $size: '$seats' },
        movieTitle: { $arrayElemAt: ['$movieDetail.title', 0] },
        sessionTime: { $arrayElemAt: ['$sessionDetail.time', 0] },
      },
    },
  ])
}

export async function createBooking(
  input: DocumentDefinition<BookingDocument>
) {
  return BookingModel.create(input)
}

export async function updateBooking(
  id: string,
  userId: string,
  input: DocumentDefinition<BookingDocument>
) {
  return BookingModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(userId),
    },
    input,
    { new: true } // new option to true to return the document after update was applied.
  )
}

export async function deleteBooking(id: string, userId: string) {
  return BookingModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
    userId: new mongoose.Types.ObjectId(userId),
  })
}

export async function getBookingByFilter(query: FilterQuery<BookingDocument>) {
  return await BookingModel.findOne(query).lean()
}

export async function getBookingsByFilter(query: FilterQuery<BookingDocument>) {
  return await BookingModel.find(query).lean()
}
