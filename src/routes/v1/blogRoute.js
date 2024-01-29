import express from 'express'
import { blogController } from '~/controllers/blogController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { blogValidation } from '~/validations/blogValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, blogValidation.createBlog, blogController.createBlog)
Router.get('/', blogController.getAllBlog)
Router.get('/cat/:id', blogController.getBlogByCategory)
Router.get('/:id', blogController.getBlogById)
Router.put('/like/:id', authMiddleware, blogController.likeBlog)
Router.put('/:id', authMiddleware, blogValidation.updateBlog, blogController.updateBlog)
Router.delete('/:id', authMiddleware, isAdmin, blogController.deleteBlog)

export const blogRouter = Router
