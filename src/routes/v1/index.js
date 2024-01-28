import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRouter } from './authRoute'
import { uploadRouter } from './uploadRoute'
import { brandRouter } from './brandRoute'
import { productCategoryRouter } from './productCatRoute'
import { blogCategoryRouter } from './blogCatRoute'
import { memberRouter } from './memberRoute'

const Router = express.Router()

// Check APIs V1/satus
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use!' })
})

// Auth APIs
Router.use('/auth', authRouter)
Router.use('/brand', brandRouter)
Router.use('/product/category', productCategoryRouter)
Router.use('/blog/category', blogCategoryRouter)
Router.use('/member', memberRouter)
Router.use('/upload', uploadRouter)

export const APIs_V1 = Router
