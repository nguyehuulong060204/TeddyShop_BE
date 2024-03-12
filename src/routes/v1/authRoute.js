import express from 'express'
import { authController } from '~/controllers/authController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { authValidation } from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', authValidation.createUser, authController.register)
Router.post('/login', authValidation.loginUser, authController.login)
Router.post('/login-social', authController.loginSocial)
Router.post('/refreshToken', authController.refreshToken)
Router.post('/logout', authMiddleware, authController.logoutUser)
Router.post('/send-email', authMiddleware, authController.sendEmailCode)
Router.post('/verify-email', authMiddleware, authController.verifyEmail)
Router.get('/product-favorite', authMiddleware, authController.getProductFavorite)
Router.get('/profile', authMiddleware, authController.getProfile)
Router.put('/profile', authMiddleware, authController.updateProfile)
Router.put('/address', authMiddleware, authController.updateAddress)
Router.put('/address/:addressId', authMiddleware, authController.changeAddressDefault)
Router.put('/product-favorite/:productId', authMiddleware, authController.addProductFavorite)
Router.get('/user', authController.getUsers)
Router.get('/admin', authController.getUsersAdmin)
Router.get('/:id', authController.getUserById)
Router.post('/login-admin', authValidation.loginUser, authController.loginAdmin)
Router.patch('/:id/block', authMiddleware, isAdmin, authController.blockUser)
Router.patch('/:id/unblock', authMiddleware, isAdmin, authController.unBlockUser)
Router.delete('/:id', authMiddleware, isAdmin, authController.deleteUserById)
Router.delete('/address/:addressId', authMiddleware, authController.deleteAddress)
Router.delete('/product-favorite/:productId', authMiddleware, authController.deleteProductFavorite)

export const authRouter = Router
