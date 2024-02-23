import express from 'express'
import { orderController } from '~/controllers/orderController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { orderValidation } from '~/validations/orderValidation'

const Router = express.Router()

Router.post('/', authMiddleware, orderValidation.createOrder, orderController.createOrder)
Router.get('/status', authMiddleware, orderController.getOrderByStatus)
Router.get('/:id/status', authMiddleware, isAdmin, orderController.getOrderByIdAndStatus)
Router.get('/', authMiddleware, isAdmin, orderController.getAllOrder)
Router.get('/user', authMiddleware, orderController.getOrderByUserId)
Router.get('/:id', authMiddleware, orderController.getOrderById)
Router.put('/:id/status', authMiddleware, isAdmin, orderController.updateOrderStatus)
Router.put('/:id', authMiddleware, orderValidation.updateOrder, orderController.updateOrder)

export const orderRouter = Router
