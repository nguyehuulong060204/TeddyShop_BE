import express from 'express'
import { authController } from '~/controllers/authController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { authValidation } from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', authValidation.createUser, authController.register)
Router.post('/login', authValidation.loginUser, authController.login)
Router.post('/refreshToken', authController.refreshToken)
Router.get('/logout', authController.logoutUser)
Router.get('/user', authController.getUsers)
Router.get('/admin', authController.getUsersAdmin)
Router.get('/:id', authController.getUserById)
Router.post('/login-admin', authValidation.loginUser, authController.loginAdmin)
Router.patch('/:id/block', authMiddleware, isAdmin, authController.blockUser)
Router.patch('/:id/unblock', authMiddleware, isAdmin, authController.unBlockUser)
Router.delete('/:id', authMiddleware, isAdmin, authController.deleteUserById)

export const authRouter = Router
