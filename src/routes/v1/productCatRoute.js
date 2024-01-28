import express from 'express'
import { productCategoryController } from '~/controllers/productCatController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { productCategoryValidation } from '~/validations/productCatValidation'

const Router = express.Router()

Router.post(
  '/',
  authMiddleware,
  isAdmin,
  productCategoryValidation.createProCat,
  productCategoryController.createCategory
)
Router.get('/', productCategoryController.getAllCategory)
Router.get('/:id', productCategoryController.getCategoryById)
Router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  productCategoryValidation.updateProCat,
  productCategoryController.updateCategory
)
Router.delete('/:id', authMiddleware, isAdmin, productCategoryController.deleteCategory)

export const productCategoryRouter = Router
