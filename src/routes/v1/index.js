import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRouter } from './authRoute'
import { uploadRouter } from './uploadRoute'
import { brandRouter } from './brandRoute'
import { productCategoryRouter } from './productCatRoute'
import { blogCategoryRouter } from './blogCatRoute'
import { memberRouter } from './memberRoute'
import { eventRouter } from './eventRoute'
import { scheduleRouter } from './scheduleRoute'
import { blogRouter } from './blogRoute'
import { feedbackRouter } from './feedbackRoute'
import { productRoute } from './productRoute'
import { orderRouter } from './orderRoute'
import { cartRouter } from './cartRoute'

const Router = express.Router()

// Check APIs V1/satus
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use!' })
})

// Auth APIs
Router.use('/auth', authRouter)
Router.use('/brand', brandRouter)
Router.use('/product/category', productCategoryRouter)
Router.use('/product', productRoute)
Router.use('/blog/category', blogCategoryRouter)
Router.use('/blog', blogRouter)
Router.use('/member', memberRouter)
Router.use('/event', eventRouter)
Router.use('/schedule', scheduleRouter)
Router.use('/feedback', feedbackRouter)
Router.use('/upload', uploadRouter)
Router.use('/order', orderRouter)
Router.use('/cart', cartRouter)

export const APIs_V1 = Router
