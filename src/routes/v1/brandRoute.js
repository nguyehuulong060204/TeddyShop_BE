import express from 'express'
import { brandController } from '~/controllers/brandController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { brandValidation } from '~/validations/brandValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, brandValidation.createBrand, brandController.createBrand)
Router.get('/', brandController.getAllBrand)
Router.get('/:id', brandController.getBrandById)
Router.put('/addProductToBrand', authMiddleware, isAdmin, brandController.addProductToBrand)
Router.put('/removeProductFromBrand', authMiddleware, isAdmin, brandController.removeProductToBrand)
Router.put('/:id', authMiddleware, isAdmin, brandController.updateBrand)
Router.delete('/:id', authMiddleware, isAdmin, brandController.deleteBrandById)

export const brandRouter = Router
