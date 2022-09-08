import dotenv from 'dotenv'
import mongoose from 'mongoose'

import connectDB from './src/util/connectDB'
import { server } from './src/app'
import { startWebSocketServer } from './src/websocket'

dotenv.config()
const port = process.env.PORT

// connect to database
connectDB()

// only listen to request when DB connection is established
mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.')
  startWebSocketServer(server)
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  })
})
