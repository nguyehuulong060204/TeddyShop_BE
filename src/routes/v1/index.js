import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRouter } from './authRoute'
import { uploadRouter } from './uploadRoute'

const Router = express.Router()

// Check APIs V1/satus
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use!' })
})

// Auth APIs
Router.use('/auth', authRouter)
Router.use('/upload', uploadRouter)

export const APIs_V1 = Router
