import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { productValidation } from '~/validations/productValidation'

const Router = express.Router()

// product
Router.post('/', authMiddleware, isAdmin, productValidation.createProduct, productController.createProduct)
Router.get('/search', productValidation.getProductByPriceRange, productController.getProductByPriceRange)
Router.get('/tags', productController.getProductsByTag)
Router.get('/', productController.getAllProduct)
Router.get('/:id', productController.getProductById)
Router.put('/buy', authMiddleware, productValidation.updateQuantity, productController.updateProductQuantityWhenBuy)
Router.put('/:id', authMiddleware, isAdmin, productValidation.updateProduct, productController.updateProduct)
Router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct)

// price
Router.post(
  '/price/',
  authMiddleware,
  isAdmin,
  productValidation.addPriceToProduct,
  productController.addPriceToProduct
)
Router.get('/price/:productId', productController.getPriceByProductId)
Router.put(
  '/price/:id',
  authMiddleware,
  isAdmin,
  productValidation.updatePrice,
  productController.updatePriceByProductId
)
Router.delete('/price/:id', authMiddleware, isAdmin, productController.deletePrice)

export const productRoute = Router
