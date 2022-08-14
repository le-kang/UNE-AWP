import { FilterQuery } from 'mongoose';
import BookingModel, { BookingDocument } from '../model/booking.model';

export async function getBookingsBySessionId(sessionId: string) {
  return await BookingModel.find({ sessionId }).lean();
}

export async function getBookingsByFilter(query: FilterQuery<BookingDocument>) {
  return await BookingModel.find(query).lean();
}