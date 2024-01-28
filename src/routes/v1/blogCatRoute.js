import express from 'express'
import { blogCategoryController } from '~/controllers/blogCatController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { blogCaterogryValidation } from '~/validations/blogCatValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, blogCaterogryValidation.createBlogCat, blogCategoryController.createCategory)
Router.get('/', blogCategoryController.getAllCategory)
Router.get('/:id', blogCategoryController.getCategoryById)
Router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  blogCaterogryValidation.updateBlogCat,
  blogCategoryController.updateCategory
)
Router.delete('/:id', authMiddleware, isAdmin, blogCategoryController.deleteCategory)

export const blogCategoryRouter = Router
