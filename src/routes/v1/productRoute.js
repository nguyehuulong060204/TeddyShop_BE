import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { productValidation } from '~/validations/productValidation'

const Router = express.Router()

// product
Router.post('/', authMiddleware, isAdmin, productValidation.createProduct, productController.createProduct)
Router.get('/tags', productController.getProductsByTag)
Router.get('/', productController.getAllProduct)
Router.get('/:id', productController.getProductById)
Router.put('/buy', authMiddleware, productController.updateProductQuantityWhenBuy)
Router.put('/:id', authMiddleware, isAdmin, productValidation.updateProduct, productController.updateProduct)
Router.put(
  '/price/:id',
  authMiddleware,
  isAdmin,
  productValidation.updateProductPrice,
  productController.updateProductPrice
)
Router.delete('/price/:id/:attributesId', authMiddleware, isAdmin, productController.deleteProductPrice)
Router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct)

export const productRoute = Router
