import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRouter } from './authRoute'

const Router = express.Router()

// Check APIs V1/satus
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use!' })
})

// Auth APIs
Router.use('/auth', authRouter)

export const APIs_V1 = Router
