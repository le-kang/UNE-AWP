import dotenv from 'dotenv'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../src/app'

import MovieModel from '../src/model/movie.model'
import movies from '../src/data/movies.json'
import UserModel from '../src/model/user.model'
import BookingModel from '../src/model/booking.model'

dotenv.config()

let token = ''

describe('Movies APIs', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1/testing')
    const res = await request(app).post('/api/auth/register').send({
      username: 'test',
      password: 'test',
    })
    expect(res.status).toBe(200)
    token = res.body.token
  })

  beforeEach(async () => {
    await MovieModel.insertMany(movies)
  })

  afterEach(async () => {
    await MovieModel.deleteMany()
  })

  afterAll(async () => {
    await UserModel.deleteMany()
    await BookingModel.deleteMany()
    await mongoose.connection.close()
  })

  it('Get | all movies', async () => {
    const res = await request(app).get('/api/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(6)
  })

  it('Get | all bookings', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
  })

  it('Post | Create a bookings', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', 'Bearer ' + token)
      .send({
        sessionId: '62f87675bebc07b56c891634',
        seats: [74],
      })
    expect(res.status).toBe(200)
    expect(res.body._id).toBeDefined()
  })

  it('Put | Update a bookings', async () => {
    const UPDATED_SEATS = [1, 2, 3]
    const newBookingRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', 'Bearer ' + token)
      .send({
        sessionId: '62f87675bebc07b56c891634',
        seats: [61],
      })

    const updateBookingRes = await request(app)
      .put('/api/bookings/' + newBookingRes.body._id)
      .set('Authorization', 'Bearer ' + token)
      .send({
        sessionId: '62f87675bebc07b56c891634',
        seats: UPDATED_SEATS,
      })
    expect(updateBookingRes.status).toBe(200)
    expect(updateBookingRes.body._id).toBe(newBookingRes.body._id)
    expect(updateBookingRes.body.seats).toStrictEqual(UPDATED_SEATS)
  })

  it('Delete | Delete a bookings', async () => {
    const newBookingRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', 'Bearer ' + token)
      .send({
        sessionId: '62f87675bebc07b56c891634',
        seats: [51],
      })
    const res = await request(app)
      .delete('/api/bookings/' + newBookingRes.body._id)
      .set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })
})
