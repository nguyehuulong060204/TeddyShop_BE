import express from 'express'
import { cartController } from '~/controllers/cartController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cartValidation } from '~/validations/cartValidation'

const Router = express.Router()

Router.post('/', authMiddleware, cartValidation.addToCart, cartController.addToCart)
Router.get('/', authMiddleware, cartController.getCartByUserId)
Router.get('/product', authMiddleware, cartController.getCartByProductId)
Router.put('/:id', authMiddleware, cartController.updateCart)
Router.delete('/:id', authMiddleware, cartController.deleteCartById)
Router.delete('/clear', authMiddleware, cartController.clearCartByUserId)

export const cartRouter = Router
