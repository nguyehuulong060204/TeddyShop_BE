/* eslint-disable no-console */
import mongoose from 'mongoose'
import { env } from './environment'

const dbConnection = () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const connect = mongoose.connect(env.MONGODB_URI)
    console.log('Database Connected Successfully')
  } catch (error) {
    console.log('Database Connected Error')
  }
}

export default dbConnection
